const container = document.querySelector(".container");
const coffees = [
  {
    name: "Perspiciatis",
    image: "images/coffee1.jpg",
  },
  {
    name: "Voluptatem",
    image: "images/coffee2.jpg",
  },
  {
    name: "Explicabo",
    image: "images/coffee3.jpg",
  },
  {
    name: "Rchitecto",
    image: "images/coffee4.jpg",
  },
  {
    name: " Beatae",
    image: "images/coffee5.jpg",
  },
  {
    name: " Vitae",
    image: "images/coffee6.jpg",
  },
  {
    name: "Inventore",
    image: "images/coffee7.jpg",
  },
  {
    name: "Veritatis",
    image: "images/coffee8.jpg",
  },
  {
    name: "Accusantium",
    image: "images/coffee9.jpg",
  },
];
const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // navigator.serviceWorker
    //   .register("/serviceWorker.js")
    //   .then((res) => console.log("service worker registered"))
    //   .catch((err) => console.log("service worker not registered", err));
    let updated = false;
    let activated = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // This will be triggered when the service worker is replaced with a new one.
      // We do not just reload the page right away, we want to make sure we are fully activated using the checkUpdate function.
      console.log({ state: "updated" });
      updated = true;
      checkUpdate();
    });
    navigator.serviceWorker.register("/serviceWorker.js").then((regitration) => {
      regitration.addEventListener("updatefound", () => {
        const worker = regitration.installing;
        worker.addEventListener("statechange", () => {
          console.log({ state: worker.state });
          if (worker.state === "activated") {
            // Here is when the activated state was triggered from the lifecycle of the service worker.
            // This will trigger on the first install and any updates.
            activated = true;
            checkUpdate();
          }
        });
      });
    });

    function checkUpdate() {
      if (activated && updated) {
        console.log("Application was updated refreshing the page...");
        window.location.reload();
      }
    }
  });
}

Notification.requestPermission((result) => {
  if (result === "granted") {
  }
});

const sendButton = document.getElementById("send-button");
const sendButton2 = document.getElementById("send-button2");

sendButton.addEventListener("click", () => {
  console.log("click");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistration().then((sw) => sw.showNotification("Hello"), {
      vibrate: [200, 100, 200, 100, 200, 100, 200],
    });
  }
});

sendButton2.addEventListener("click", () => {
  setTimeout(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((sw) => sw.showNotification("Hello"), {
        vibrate: [200, 100, 200, 100, 200, 100, 200],
      });
    }
  }, 10000);
});
