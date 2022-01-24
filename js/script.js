const listItems = document.querySelectorAll(".list-item");
let data = [];
let time = "weekly";

fetch("./data/data.json")
    .then((res) => res.json())
    .then((data2) => {
        data = data.concat(data2);
        update(time);
    });

listItems.forEach((ele) => {
    ele.addEventListener("click", () => {
        ele.classList.add("active");
        time = ele.innerText.toLowerCase();
        listItems.forEach((element) => {
            if (element != ele) {
                element.classList.remove("active");
            }
        });
        update(time);
    });
});

function getCard(id) {
    return {
        element: document.getElementById(id.toLowerCase()),
        time: function () {
            return this.element.querySelector(".time");
        },
        last_time: function () {
            return this.element.querySelector(".last-time");
        },
    };
}

function update(time) {
    data.forEach((cate) => {
        const timeframe = getCard(cate.title);
        switch (time) {
            case "daily":
                timeframe.time().innerText =
                    cate.timeframes.daily.current + "hrs";

                timeframe.last_time().innerText =
                    "Last Day - " + cate.timeframes.daily.previous + "hrs";
                break;
            case "weekly":
                timeframe.time().innerText =
                    cate.timeframes.weekly.current + "hrs";
                timeframe.last_time().innerText =
                    "Last Week - " + cate.timeframes.weekly.previous + "hrs";
                break;
            case "monthly":
                timeframe.time().innerText =
                    cate.timeframes.monthly.current + "hrs";
                timeframe.last_time().innerText =
                    "Last Month - " + cate.timeframes.monthly.previous + "hrs";
                break;
        }
    });
}
