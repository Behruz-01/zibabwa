// ekranga chiqarish
const elParrotTemplate = document.querySelector("#parrot-template")
const elParrotWrapper = document.querySelector(".list")

const addNull = num =>{return num < 10 ? "0" + num : num}

const creatyParrotRow = (product) =>{
    const { id, title, img, price, birthDate, sizes, isFavorite, features } =
    product;


    const elParrotRow = elParrotTemplate.cloneNode(true).content;

    const elParrotImg = elParrotRow.querySelector(".card-img-top")
    elParrotImg.src = img;

 
    const elParrotTitle = elParrotRow.querySelector(".card-title")
    elParrotTitle.textContent = title;  


    const elParrotPrice = elParrotRow.querySelector(".card-mark")
    elParrotPrice.textContent = price;

    

    const elParrotBadge = elParrotRow.querySelector(".badge-size")
    elParrotBadge.textContent = `${sizes.width} sm x ${sizes.height} sm `
    // elParrotBadge.textContent = sizes;

    

    const elParrotTime = elParrotRow.querySelector(".card-time")
    const time = new Date()
    elParrotTime.textContent = `${addNull(time.getDate())}.${addNull(time.getMonth()+1)}.${time.getFullYear()}`


    const elBeautiful = elParrotRow.querySelector(".badges")
    elBeautiful.textContent = features;
    // document.getElementById("one").innerHTML = str.split("");


    const elDeleteBtn = elParrotRow.querySelector(".btn-delete")
    elDeleteBtn.dataset.id = id;


    // edit
    const elEditBtn = elParrotRow.querySelector(".btn-secondary");
    elEditBtn.dataset.id = id;

    return elParrotRow
}



    const parrotRender = (parrotsArray = products)=>{
        elParrotWrapper.innerHTML = "";

        parrotsArray.forEach((product)=>{
            const elParrotRow = creatyParrotRow(product)
    
    
            elParrotWrapper.appendChild(elParrotRow)
    })
    }

    parrotRender()




// add

const elAddForm = document.querySelector("#form-add");

elAddForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    const formElements = evt.target.elements;
    
    const formTitle = formElements.title.value.trim();
    const formImg = formElements.img.value;
    const formPrice = +formElements.price.value;
    const formDate = formElements.date.value;
    const formWidth = +formElements.width.value;
    const formHight = +formElements.height.value;
    const formfeatures = formElements.features.value;

    if(formTitle && formImg && formPrice>0 && formDate && formWidth>0 && formHight>0 && formfeatures){
        const adding = {
            id:Math.floor(Math.random()*1000),
            img: formImg,
            title: formTitle,
            price: formPrice,
            birthDate: new Date().toISOString(),
            // width: formWidth,
            // height: formHight,
            sizes: {
                width: formWidth,
                height: formHight,
            },
            features: formfeatures,
        }

        products.unshift(adding);

        const elNewParrot = creatyParrotRow(adding);
        elParrotWrapper.prepend(elNewParrot);
    }



})


// edit uchun
const elEditMadal = new bootstrap.Modal("#edit-parrot-modal");
const elEditForm = document.querySelector("#form-adit");
const elEditTitle = elEditForm.querySelector("#edit-title");
const elEditImage = elEditForm.querySelector("#edit-img");
const elEditPrice = elEditForm.querySelector("#edit-price");
const elEditDate = elEditForm.querySelector("#edit-date");
const elEditWidht = elEditForm.querySelector("#edit-width");
const elEditHeight = elEditForm.querySelector("#edit-height");
const elEditFeat = elEditForm.querySelector("#edit-features");



// delete

elParrotWrapper.addEventListener("click", (evt)=>{
    if(evt.target.matches(".btn-delete")){
        const clickedId = +evt.target.dataset.id;

        

        const clickedIndex = products.findIndex(productjon=>{
            return productjon.id == clickedId
        })

        products.splice(clickedIndex, 1)


        parrotRender()
    }


    // edit qismi
    if(evt.target.matches(".btn-secondary")){
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnObj = products.find((product) => product.id == clickedBtnId);
        // const clickedBtnObj = products[clickedBtnIndex]
        
        if(clickedBtnObj){
            elEditTitle.value = clickedBtnObj.title || "";
            elEditImage.value = clickedBtnId.img || "";
            elEditPrice.value = clickedBtnObj.price || "";
            elEditDate.value = clickedBtnObj.birthDate || "";
            elEditWidht.value = clickedBtnObj.sizes.width || "";
            elEditHeight.value = clickedBtnObj.sizes.height || "";
            elEditFeat.value = clickedBtnObj.features || "";


            elEditForm.dataset.id = clickedBtnId;

        }

    }

    
})


// edit
elEditForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();

    const submittingItemId = +evt.target.dataset.id;

    const formTitle = elEditTitle.value;
    const formImg = elEditImage.value;
    const formPrice = +elEditPrice.value;
    const formDate = elEditDate.value;
    const formWidth = +elEditWidht.value;
    const formHight = +elEditHeight.value;
    const formfeatures = elEditFeat.value;

    if(formTitle && formImg && formPrice>0 && formDate && formWidth>0 && formHight>0 && formfeatures){
        const submittingItemIndex = products.findIndex(product => product.id == submittingItemId) 

        const  submittingItemObj = {
            id:submittingItemId,
            title: formTitle,
            price: formPrice,
            birthDate: new Date().toISOString(),
            // width: formWidth,
            // height: formHight,
            sizes: {
                width: formWidth,
                height: formHight,
            },
            features: formfeatures,
        }


        products.splice(submittingItemIndex , 1 ,  submittingItemObj )

        parrotRender();

        elEditMadal.hide();
    }
})













// filter
const elFilterForm = document.querySelector("#filter")


elFilterForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();

    const elements = evt.target.elements;
    const searchValue = elements.search.value;
    const sortValue = elements.sortby.value;
    

    const filtredParrots = products.filter(function(element){
        const isTitleMatches = element.title.toLowerCase().includes(searchValue.toLowerCase())
        const isPriceMatches = element.title.toLowerCase().includes(searchValue.toLowerCase())
        return isTitleMatches || isPriceMatches
    }).sort((a,b)=>{
        if (sortValue == "1"){
            if(a.title > b.title){
                return 1
            }else if(a.title == b.title){
                return 0
            }
            return -1
        }
        else if(sortValue == "2"){
            return b.price - a.price;

        } else if (sortValue == "3"){
            return a.price - b.price;
        }else if (sortValue == "4"){
            return (new Date(a.birthDate).getTime()) - (new Date(b.birthDate).getTime())
        }
    })

    // elParrotWrapper.innerHTML = "";
    // filtredParrots.forEach(product =>{
    //     const elCreatedParrot = creatyParrotRow(product)
    //     elParrotWrapper.append(elCreatedParrot)
    // })

    parrotRender(filtredParrots)
    
})




