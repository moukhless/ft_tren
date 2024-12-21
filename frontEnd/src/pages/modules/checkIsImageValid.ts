export function checkIsImageValid() {
    let previewImage = document.getElementById(
      "selectedImage"
    ) as HTMLImageElement;
    let formInputImage = document.getElementById(
      "formInputImage"
    ) as HTMLInputElement;
    let errorsSpan = document.getElementById("image-errors") as HTMLSpanElement;
    let file = formInputImage.files;
    if (file) {
      errorsSpan.innerText = "";
      let newImage = new Image();
      newImage.src = URL.createObjectURL(file[0]);
      newImage.onload = function () {
        let size = file[0].size / 1000000; //converting from bytes to MB
        if (size > 10) errorsSpan.innerText = "image has more than 10MB";
        if (newImage.width > 400 || newImage.height > 800)
          errorsSpan.innerText =
            "image dimentions not accepted, please retry with an other one ";
        if (errorsSpan.innerText !== "") {
          formInputImage.value = "";
          previewImage.src = "";
          !previewImage.classList.contains("d-none") &&
            previewImage.classList.add("d-none");
          errorsSpan.classList.contains("d-none") &&
            errorsSpan.classList.remove("d-none");
        } else {
          previewImage.classList.contains("d-none") &&
            previewImage.classList.remove("d-none");
          !errorsSpan.classList.contains("d-none") &&
            errorsSpan.classList.add("d-none");
          previewImage.src = newImage.src;
        }
      };
    }
  }