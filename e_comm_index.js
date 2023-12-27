var form=document.getElementById('addForm');
var itemsListElectronics=document.getElementById('items_electronic');
var itemsListClothing=document.getElementById('items_clothing');
var itemsListSkincare=document.getElementById('items_skincare');
var del=document.querySelectorAll('#deleteBtn')
var countID=0;
var flag=null;
form.addEventListener('submit',addItem);
//itemsList.addEventListener('click',editPerson);

itemsListClothing.addEventListener('click',removeItem);
itemsListElectronics.addEventListener('click',removeItem);
itemsListSkincare.addEventListener('click',removeItem);


	//@CrossOrigin(origins = "http://localhost:8080")

function addItem(e)
{
    e.preventDefault();

    //CREATE NEW OBJ:
    const obj={
        product_name: document.getElementById('product_name').value,
        price:document.getElementById('price').value,
        category: document.getElementById('category').value
    };

    //STORE IN CLOUD:
    var id;
    axios.post('https://crudcrud.com/api/4a79b623c9924a0c8e4b47b3c461d5fb/ProductDetails',obj)
        .then((res)=>{
            console.log(res);
             console.log(res.data._id);
             id=res.data._id;
             showOutput(obj,id);
        
    })
        .catch(err=>console.log(err));

         
    
}

function showOutput(res,id) {

//create new person
    var li=document.createElement('li');
    console.log(res);
    console.log(id);

    console.log(res.category);
//add class
    li.className='list-group-item';
    li.id=id;

//add text node
    li.textContent=res.product_name;
   
//create delete button
    var input=document.createElement('input');

//add class name for delete button
    input.type="button";
    input.className="btn btn-danger btn-sm float-right delete";
    input.id="deleteBtn";
    input.value="DELETE";


//append button to li
    li.appendChild(input);

    if(res.category==="Electronics")
        itemsListElectronics.appendChild(li);
    else if(res.category==="Clothing")
        itemsListClothing.appendChild(li);
    else if(res.category==="SkinCare")
        itemsListSkincare.appendChild(li);
    console.log(li);
  }
  


 function removeItem(e)
{

    if(e.target.classList.contains('delete'))
    {
        //console.log(2);
        if(confirm('Are you sure?'))
        {
            var li=e.target.parentElement;
            console.log(li.id);
            axios
              .delete(
               `https://crudcrud.com/api/4a79b623c9924a0c8e4b47b3c461d5fb/ProductDetails/${li.id}`
              )
              .then((res) => {
                console.log("object deleted");
                //ele.remove();
              })
              .catch((err) => console.log(err));
        }

    }
    
}

window.addEventListener("load", () => {
    //flag=false;
    axios
      .get(
        "https://crudcrud.com/api/4a79b623c9924a0c8e4b47b3c461d5fb/ProductDetails"
      )
      .then((res) => {
        const data = res.data;
        data.forEach((val) => {
          showOutput(val);
        });
      })
      .catch((err) => console.log(err));
  });