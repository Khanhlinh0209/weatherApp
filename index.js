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
      .then((response) => {
        if (!response.ok) {
          // Nếu phản hồi không OK, thông báo lỗi
          throw new Error("City not found. Please enter a valid city name.");
        }
        return response.json(); // Parse dữ liệu JSON
      })
      .then((data) => {
        additemToUI(data); // Thêm dữ liệu vào giao diện
        addItemToLocalStorage(data); // Lưu dữ liệu vào localStorage
      })
      .catch((error) => {
        // Hiển thị thông báo lỗi khi API không trả về dữ liệu
        alert(error.message);
      });
  } else {
    alert("Please enter a city name ");
  }
});

//hàm lưu item vào localSotrage
const addItemToLocalStorage = (item) => {
  let list = getList(); //lấy danh sách từ localStorage
  list.push(item); // thêm item vào list
  localStorage.setItem("list", JSON.stringify(list)); //Lưu danh sách vào localStorage
};
//Hàm lấy danh sách từ localSotrage
const getList = () => {
  const storedList = localStorage.getItem("list");
  return storedList ? JSON.parse(storedList) : []; // Nếu không có dữ liệu thì trả về mảng rỗng
};

const additemToUI = (data) => {
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
};

//Hàm khi load lại trang thì item vẫn hiển thị
const init = (data) => {
  let list = getList(); //lấy danh sách
  list.forEach((item) => {
    additemToUI(item);
  });
};
// init();
