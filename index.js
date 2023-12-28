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
  let AnotherImages = document.createElement("img");

  // set the value to the element
  MainImageTag.setAttribute("src", ProductDetails.images[0].src);

  // appending data
  Main_Image_Container.append(MainImageTag);
}
