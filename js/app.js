(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.getElementById("uploadForm").addEventListener("submit", (function(event) {
        event.preventDefault();
        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];
        if (!file || file.type !== "text/plain") return alert("Файл повинен бути у форматі txt");
        const reader = new FileReader;
        reader.onload = function(event) {
            const content = event.target.result;
            const numbers = content.match(/\S+/g);
            if (numbers && !isNaN(numbers[0])) {
                const numbersArray = numbers.map((str => {
                    const num = parseFloat(str.replace(",", ""));
                    return num;
                }));
                maxValue(numbersArray);
                minValue(numbersArray);
                medianValue(numbersArray);
                midValue(numbersArray);
            } else return alert("Файл не містить чисел");
        };
        if (file) reader.readAsText(file);
    }));
    const maxValue = arr => {
        let max = arr[0];
        if (!isNaN(max)) {
            for (let i = 1; i < arr.length; i++) if (arr[i] > max) max = arr[i];
            localStorage.setItem("maxValue", max);
            return wrapperMaxValue.textContent = max;
        }
    };
    const minValue = arr => {
        let min = arr[0];
        if (!isNaN(min)) {
            for (let i = 1; i < arr.length; i++) if (arr[i] < min) min = arr[i];
            localStorage.setItem("minValue", min);
            return wrapperMinValue.textContent = min;
        }
    };
    const medianValue = arr => {
        if (!isNaN(arr[0])) {
            arr.sort(((a, b) => a - b));
            const middle = Math.floor(arr.length / 2);
            if (arr.length % 2 === 0) {
                let median = (arr[middle - 1] + arr[middle]) / 2;
                localStorage.setItem("medianValue", median);
                return wrapperMedianaValue.textContent = median;
            } else {
                localStorage.setItem("medianValue", arr[middle]);
                return wrapperMedianaValue.textContent = arr[middle];
            }
        }
    };
    const midValue = arr => {
        if (!isNaN(arr[0])) {
            let sum = arr.reduce(((a, b) => a + b));
            let mid = sum / arr.length;
            localStorage.setItem("midValue", mid);
            return wrapperMidValue.textContent = mid;
        }
    };
    const wrapperMaxValue = document.querySelector(".main__result-1");
    const wrapperMinValue = document.querySelector(".main__result-2");
    const wrapperMedianaValue = document.querySelector(".main__result-3");
    const wrapperMidValue = document.querySelector(".main__result-4");
    wrapperMinValue.textContent = localStorage.getItem("minValue");
    wrapperMaxValue.textContent = localStorage.getItem("maxValue");
    wrapperMedianaValue.textContent = localStorage.getItem("medianValue");
    wrapperMidValue.textContent = localStorage.getItem("midValue");
    const resetButton = document.querySelector(".main__reset");
    resetButton.addEventListener("click", (() => {
        localStorage.clear();
        location.reload();
    }));
    window["FLS"] = true;
    isWebp();
})();