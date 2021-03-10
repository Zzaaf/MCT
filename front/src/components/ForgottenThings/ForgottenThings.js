import React, {useState} from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {addPictureAC, addNameAC, addImageAC} from '../../redux/actionCreators'

function ForgottenThings(props) {
    const dispatch = useDispatch()
    const name = useSelector(state => state.pictures.name)
    const image = useSelector(state => state.pictures.image)
    const store = useSelector(state => state.pictures)
  
    const [progressPercent, setProgressPercent] = useState(0);
  
    const [error, setError] = useState({
      found: false,
      message: "",
    });
  
    const upload = ({ target: { files } }) => {
      let data = new FormData();
      data.append('categoryImage', files[0]);
      data.append('name', files[0] && files[0].name);
      dispatch(addPictureAC(data))
    };
  
    function handleSubmit(event) {
      event.preventDefault();
      dispatch(addNameAC(name))
      dispatch(addImageAC(image))
      setProgressPercent(0);
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          console.log(`${loaded}kb of ${total}kb | ${percent}%`);
          setProgressPercent(percent);
        },
      };
  
      axios
        .post("http://localhost:3000/api/category", store.formData, options)
        .then((res) => {
          setTimeout(() => {
            dispatch(addNameAC(res.data.category))
            dispatch(addImageAC(res.data.category))
            setProgressPercent(0);
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          setError({
            found: true,
            message: err.response.data.errors,
          });
  
          setTimeout(() => {
            setError({
              found: false,
              message: "",
            });
            setProgressPercent(0);
          }, 3000);
        });
    }
  
    return (
      <div
        style={{ width: "100vw", height: "100vh" }}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        {error.found && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ width: "359px"}}
          >
            {error.message}
          </div>
        )}
  
        <form onSubmit={handleSubmit} style={{ width: "359px" ,  marginTop: '75px' }}>
          <div className="progress mb-3 w-100">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progressPercent}%` }}
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {progressPercent}
            </div>
          </div>
          <div className="custom-file mb-3">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              onChange={upload}
            />
            {/* <label className="custom-file-label" htmlFor="inputGroupFile04">
              Choose file
            </label> */}
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{marginTop: '20px'}}>
            Submit
          </button>
        </form>
        <img
          className="mt-3"
          src={`http://localhost:3000/${image && image.image}`}
          alt={`${name && name.name}`}
          style={{ width: "359px" }}
        />
      </div>
    );
}

export default ForgottenThings;