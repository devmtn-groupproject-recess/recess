import React, {Component} from 'react' 
import Axios from 'axios'
import {connect} from 'react-redux'

import './s3Bucket.css'

class S3Bucket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: '',
            fileName: '',
            fileType: '',
            img: ''
        }

        this.handlePhoto = this.handlePhoto.bind(this)
        this.sendPhoto = this.sendPhoto.bind(this)
    }

    handlePhoto(event) {
        const reader = new FileReader()

        const file = event.target.files[0]

        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                fileName: file.name,
                fileType: file.type,
                img: ''
            })
        }
        reader.readAsDataURL(file)
    }

    sendPhoto() {
        return Axios.post('/api/s3', this.state).then(res => {
            //take this res.data.Location and set it to the database as the image
            console.log(909090, this.props)
            if(this.props.updateUserPic){
                console.log("UPDATE USER PICTURE")
                this.props.updateUserPic(res.data.Location)
            }else if(this.props.setUserPic){
                console.log("SET USER PICTURE")
                this.props.setUserPic(res.data.Location)
            }else if(this.props.updateCarPic){
                console.log("UPDATE CAR PICTURE")
                this.props.updateCarPic(res.data.Location)
            }else if(this.props.setCarPic){
                console.log("SET CAR PICTURE")
                this.props.setCarPic(res.data.Location)
            }else if(this.props.updateDriverPic){
                console.log("UPDATE DRIVER PICTURE")
                this.props.updateDriverPic(res.data.Location)
            }else if(this.props.setDriverPic){
                console.log("SET DRIVER PICTURE")
                this.props.setDriverPic(res.data.Location)
            }else{
                console.log('No Pic')
            }
            console.log(4444, res.data)
            this.setState({
                img: res.data.Location
            })
        }).catch( res => {
            if(res === 'Request failed with status code 413' ){
                alert("File Size is too large")
            }else {
                alert("Something went wrong, try again")
            }
        })
    }

    

    render() {
        return (
            <div className='s3Bucket'>
                {/* <p>{'Choose Profile Picture: '}</p> */}
                <input type='file' id='file' className='inputfile' onChange={this.handlePhoto} />
                <label for='file'>Choose File</label>
                <button className='uploadButton' onClick={this.sendPhoto}>Upload</button>
            </div>
        )
    }
}

export default S3Bucket