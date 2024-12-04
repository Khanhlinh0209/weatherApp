const form = document.querySelector(".container form");
const inputCity = document.querySelector(".inputCity");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = inputCity.value.trim(); // Lấy tên thành phố từ input
  if (cityName) {
    console.log("City Name:", cityName);

    const apiKey = "115ad39c5e6db1215b30f60bc2b94b9a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;
    fetch(url)
      .then((response) => response.json()) // Parse dữ liệu JSON
      .then((data) => {
        // console.log(data); // Xử lý dữ liệu thời tiết trả về từ API
        const { main, weather, name } = data;
        const iconCode = weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const li = document.createElement("li");
        li.classList.add("city");

        const markup = `
        <div class="weather-card">
            <div class="location">
              <span>${name}</span>
            </div>
            <div class="temperature">
              <span>${Math.round(main.temp)}</span>
              <sup>°C</sup>
            </div>
            <div class="city-icon">
              <img src="${iconURL}" alt="${weather[0].main}" />
            </div>
            <div class="description">${weather[0].description}</div>
          </div>
        `;
        li.innerHTML = markup;
        document.querySelector(".cities").appendChild(li);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); // Nếu có lỗi khi gọi API
      });
  } else {
    alert("Please enter a city name ");
  }
});
