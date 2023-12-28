let Main_Image_Container = document.querySelector("#mainImage");
let Other_4_Images_Container = document.querySelector("#OtherImages");
let Details_Container = document.querySelector("#detailsContainer");

let Fetch_Data_From_Server = async () => {
  let url = `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.product;
  } catch (error) {
    console.log(error.message);
  }
};

window.addEventListener("load", () => {
  Attach_Data_To_Ui();
});

async function Attach_Data_To_Ui() {
  // fetching data
  let ProductDetails = await Fetch_Data_From_Server();
  console.log(ProductDetails);

  Main_Image_Container.textContent = "";
  Other_4_Images_Container.textContent = "";
  Details_Container.textContent = "";

  // creating element here
  let MainImageTag = document.createElement("img");
  let TitleDiv = document.createElement("div");
  let Vendor = document.createElement("p");
  let title = document.createElement("p");
  let priceDiv = document.createElement("div");
  let mainPrice = document.createElement("div");
  let discountPrice = document.createElement("p");
  let discountRate = document.createElement("p");
  let originalPrice = document.createElement("p");
  let colorDiv = document.createElement("div");
  let colortag = document.createElement("p");
  let colors = document.createElement("div");

  // set the value to the element
  MainImageTag.setAttribute("src", ProductDetails.images[0].src);
  ProductDetails.images.forEach((element) => {
    let AnotherImages = document.createElement("img");
    AnotherImages.setAttribute("src", element.src);
    Other_4_Images_Container.append(AnotherImages);
  });

  Vendor.textContent = ProductDetails.vendor;
  title.textContent = ProductDetails.title;
  let num1 = Number(ProductDetails.compare_at_price.slice(1));
  let num2 = Number(ProductDetails.price.slice(1));
  discountPrice.textContent = ProductDetails.price;

  let discount = Math.floor(((num1 - num2) / num1) * 100);
  discountRate.textContent = `${discount}%`;
  originalPrice.textContent = ProductDetails.compare_at_price;
  colortag.textContent = "Choose a Color";

  // appending data
  Main_Image_Container.append(MainImageTag);
  TitleDiv.append(Vendor, title);
  mainPrice.append(discountPrice, discountRate);
  priceDiv.append(mainPrice, originalPrice);
  colorDiv.append(colortag, colors);
  Details_Container.append(TitleDiv, priceDiv, colorDiv);
}
