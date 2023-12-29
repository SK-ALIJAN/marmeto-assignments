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

async function Attach_Data_To_Ui(imagelink) {
  // ............fetching data...................
  let ProductDetails = await Fetch_Data_From_Server();
  console.log(ProductDetails);
  let imageSrc = imagelink ?? ProductDetails.images[0].src;

  Main_Image_Container.textContent = "";
  Other_4_Images_Container.textContent = "";
  Details_Container.textContent = "";

  // ........creating element here..............
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
  let sizeDiv = document.createElement("div");
  let sizetag = document.createElement("p");
  let sizes = document.createElement("div");
  let cartDiv = document.createElement("div");
  let BtnDiv = document.createElement("div");
  let minusSign = document.createElement("p");
  let numberShow = document.createElement("p");
  let plusSign = document.createElement("p");
  let cartBtn = document.createElement("button");
  let summary = document.createElement("p");

  // ......set the value to the element ............
  MainImageTag.setAttribute("src", imageSrc);
  ProductDetails.images.forEach((element) => {
    let AnotherImages = document.createElement("img");
    AnotherImages.addEventListener("click", () => {
      Attach_Data_To_Ui(element.src);
    });
    AnotherImages.setAttribute("src", element.src);
    Other_4_Images_Container.append(AnotherImages);
  });

  Vendor.textContent = ProductDetails.vendor;
  title.textContent = ProductDetails.title;
  let num1 = Number(ProductDetails.compare_at_price.slice(1));
  let num2 = Number(ProductDetails.price.slice(1));
  discountPrice.textContent = `${ProductDetails.price}.00`;

  let discount = Math.floor(((num1 - num2) / num1) * 100);
  discountRate.textContent = `${discount}% Off`;
  originalPrice.textContent = `${ProductDetails.compare_at_price}.00`;
  colortag.textContent = "Choose a Color";
  ProductDetails.options[0].values.forEach((ele) => {
    let colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = Object.values(ele)[0];
    colorDiv.addEventListener("mouseenter", () => {
      colorDiv.style.outline = `2px solid ${Object.values(ele)[0]}`;
      colorDiv.style.outlineOffset = `5px`;
    });

    colorDiv.addEventListener("mouseout", () => {
      colorDiv.style.outline = `none`;
    });

    colors.append(colorDiv);
  });
  sizetag.textContent = "Choose a Size";
  ProductDetails.options[1].values.forEach((ele) => {
    let sizeDiv = document.createElement("div");
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "size";
    input.value = ele;
    input.id = ele;
    label.textContent = ele;
    label.htmlFor = ele;

    sizeDiv.append(input, label);
    sizes.append(sizeDiv);
  });
  minusSign.textContent = "-";
  numberShow.textContent = 0;
  plusSign.textContent = "+";
  cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add To Cart`;
  summary.innerHTML = ProductDetails.description;

  // .........add className............
  TitleDiv.className = "TitleDiv";
  Vendor.className = "title";
  colortag.className = "title";
  sizetag.className = "title";
  title.className = "header";
  priceDiv.className = "TitleDiv";
  sizeDiv.className = "TitleDiv";
  mainPrice.className = "mainPrice";
  originalPrice.className = "originalPrice";
  colorDiv.className = "colorDiv";
  colors.className = "colors";
  sizes.className = "sizeDiv";
  cartDiv.className = "cartDiv";
  BtnDiv.className = "BtnDiv";
  summary.className = "summary";

  // .........appending element...........
  Main_Image_Container.append(MainImageTag);
  TitleDiv.append(Vendor, title);
  mainPrice.append(discountPrice, discountRate);
  priceDiv.append(mainPrice, originalPrice);
  colorDiv.append(colortag, colors);
  sizeDiv.append(sizetag, sizes);
  BtnDiv.append(minusSign, numberShow, plusSign);
  cartDiv.append(BtnDiv, cartBtn);
  Details_Container.append(
    TitleDiv,
    priceDiv,
    colorDiv,
    sizeDiv,
    cartDiv,
    summary
  );
}
