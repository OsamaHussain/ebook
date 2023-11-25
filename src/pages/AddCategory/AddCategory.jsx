import Form from 'react-bootstrap/Form';
import { useReducer, useEffect, useState } from "react"
import { reducer } from "./../../utils/Global"
import { useUploadPic, useUploadDoc } from "./../../firebase/useFirebase"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
const AddCategory = () => {
  const navigate = useNavigate()
  const initialState = {
    categoryId: "",
    categoryImage: "",
    categoryName: "",
    subCategories: []
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [categoryId, setCategoryId] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [showSuccessBtn, setShowSuccessBtn] = useState(false)
  const [subCategoryDownloadUrl, setSubCategoryDownloadUrl] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [dynamicCategories, setDynamicCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [subCategoryImage, setSubCategoryImage] = useState(null)
  const [downloadUrl, setDownlodUrl] = useState("")
  const [categorypreview, setCategoryPreview] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/categories%2F68b70231-df8c-40cd-9aa9-fcc77602d2f0.jpg?alt=media&token=f272acfe-4a94-4a7b-921d-5c6e8a02bf30")
  const [subCategoryPreview, setSubCategoryPreview] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/categories%2F76234a54-8d4b-4576-8427-333bae2a931d.jpg?alt=media&token=b36971b8-5ce9-438b-883e-08e7526c44b7")
  const handleInputChange = (e) => {
    return dispatch({
      field: e.target.name,
      payload: e.target.value
    })
  }
  const handleSubCategoryForm = (event, index) => {
    const data = [...dynamicCategories]
    if (subCategoryDownloadUrl) {
      data[index]["categoryImage"] = subCategoryDownloadUrl
      setShowSuccessBtn(false)
    }
    if (event.target.files[0]) {
      handleObjectUrl(event, index)
    }
    
    data[index][event?.target?.name] = event?.target?.value;
    setDynamicCategories(data)
    event?.target?.name === "categoryId" ? setCategoryId(event?.target?.value) : setCategoryName(event?.target?.value)
  }

  const handleObjectUrl = (event, index)=>{
    if (event.target.files[0]) {
      data[index][event.target.name] = URL.createObjectURL(event.target.files[0])
      setDynamicCategories(data)
    }
  }
  const handleAddDynamicCategories = () => {
    // setIsDisabled(true)
    let newSubCategory = {
      categoryId: "",
      categoryImage: "",
      categoryName: "",
      objectUrl: ""
    }
    setDynamicCategories(prev => [...prev, newSubCategory])

  }
  const handleRemoveDynamicCategories = (index) => {
    const data = [...dynamicCategories]
    data.splice(index, 1)
    setDynamicCategories(data)
  }

  const handleUpload = async () => {
    const { categoryId, categoryName } = state
    if (downloadUrl && categoryId && categoryName && dynamicCategories.length > 0) {
      setIsLoading(true)
      const data = {
        categoryId,
        categoryImage: downloadUrl,
        categoryName,
        subCategories: dynamicCategories
      }
      await useUploadDoc(data, "categories")
      setIsLoading(false)
      navigate("/")
    } else {
      alert("Fill out all fields!")
    }
  }
  const clearInputs = () => {
    // setCategoryId("")
    // setCategoryName("")
    // setSubCategoryDownloadUrl("")
  }
  const formValidation = () => {
    // if (categoryId && categoryName && subCategoryDownloadUrl) {
    //   setIsDisabled(false)
    // } else {
    //   setIsDisabled(true)
    // }
  }
  useEffect(() => {
    if (image) {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
      if (!allowedFormats.includes(image.type)) {
        alert("invalid format")
      } else {
        setCategoryPreview(URL.createObjectURL(image))
        useUploadPic(image, `categories/${image.name.split(".")[0]}`, setDownlodUrl, setIsLoading)
      }
    }
  }, [image])
  useEffect(() => {
    if (subCategoryImage) {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
      if (!allowedFormats.includes(subCategoryImage.type)) {
        alert("invalid format")
      } else {
        setSubCategoryPreview(URL.createObjectURL(subCategoryImage))
        useUploadPic(subCategoryImage, `categories/${subCategoryImage.name.split(".")[0]}`, setSubCategoryDownloadUrl, setIsLoading)
      }
    }
  }, [subCategoryImage])
  useEffect(() => {
    if (dynamicCategories.length > 0) {
      formValidation()
    }
    if (dynamicCategories.length === 0) {
      setIsDisabled(false)
    }

  }, [categoryId, categoryName, subCategoryDownloadUrl, dynamicCategories])

  useEffect(() => {
      if(subCategoryDownloadUrl){
        setShowSuccessBtn(true)
      }

  }, [subCategoryDownloadUrl])
  return (
    <div>
      <h1 className="mb-5">
        Add Category
      </h1>
      <div >
        <div className="mb-3 ">
          <input name="file" onChange={(e) => { setImage(e.target.files[0]) }} className="d-none" type="file" id="fileInput" />
          <label htmlFor="fileInput">
            <img style={{ borderRadius: "5%" }} src={categorypreview} width="300px" height="200px" />
          </label>
        </div>
        <Form>
          <Form.Group className="mb-3 " controlId="ControlInput1">
            <Form.Label>Category ID</Form.Label>
            <Form.Control onChange={(e) => {
              handleInputChange(e)
            }} name="categoryId" type="text" placeholder="Clothes or Mobiles..." />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="ControlInput2">
            <Form.Label>Category Name</Form.Label>
            <Form.Control onChange={(e) => {
              handleInputChange(e)
            }} name="categoryName" type="text" placeholder="Men or Women..." />
          </Form.Group>
          <div>
            {dynamicCategories.length > 0 ?
              <h1 className="mb-4 mt-5">
                Sub Categories
              </h1> : ""
            }
            <div>
              {dynamicCategories.map((field, i) => {
                let count = i;
                return (
                  <div key={i}>
                    <h3 className="mb-4">
                      {`Sub Category ${++count}`}
                    </h3>

                    <div className="mb-3">
                      <input name="objectUrl" onChange={(e) => { setSubCategoryImage(e.target.files[0]), handleSubCategoryForm(e, i) }} className="d-none" type="file" id="fileInput2" />
                      <label htmlFor="fileInput2">
                        <img style={{ borderRadius: "5%" }} src={field["categoryImage"] || field["objectUrl"] || subCategoryPreview} width="100%" height="100" />
                      </label>
                    </div>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                      <Form.Label>Sub Category ID {count}</Form.Label>
                      <Form.Control onInput={(e) => {
                        handleSubCategoryForm(e, i)
                      }} name="categoryId" value={field["categoryId"]} type="text" placeholder="Clothes or Mobiles..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlInput2">
                      <Form.Label>Sub Category Name {count}</Form.Label>
                      <Form.Control onInput={(e) => {
                        handleSubCategoryForm(e, i)
                      }} name="categoryName" value={field["categoryName"]} type="text" placeholder="Men or Women..." />
                    </Form.Group>
                    <div className="mb-5 mt-4">
                      <Button variant="dark" onClick={() => { handleRemoveDynamicCategories(i) }} className="bi fs-2 bi-trash me-3 mt-4"></Button>
                      {showSuccessBtn ? <Button variant="dark" onClick={() => { handleSubCategoryForm(e, i), clearInputs() }} className="bi fs-2 bi-check-circle mt-4"></Button> : ""}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-4">
            <Button variant="dark" disabled={isDisabled} onClick={handleUpload}>{isLoading ? "uploading..." : "Add Banner"} </Button>
            <Button variant="dark" disabled={isDisabled} onClick={() => { handleAddDynamicCategories() }} className="bi fs-2 addIcon bi-plus-circle float-end"></Button>
          </div>
        </Form>
      </div>

    </div>
  )
}
export default AddCategory