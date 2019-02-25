import React,{Component} from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';
import CarouselSlide from '../feature/Carousel';
import axios from 'axios';

class Home extends Component{
    state = { listproduk: [] }
    componentDidMount() {
        axios.get('http://localhost:2000/produk')
        .then((res) => {
            this.setState({listproduk: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderListProduk = () => {
        var produk = this.state.listproduk.map((item) => {
            var {id,nama,image,deskripsi}= item
            return(
                <div className="col-md-4 mb-4">
                    <a  href={`/produk-detail?id=${id}`} className="text-dark btn">
                        <Card >
                            <CardImg style={{ height:'200px', width:"100%", display:"block"}} src={image} alt="img"/>
                            <CardTitle>{nama}</CardTitle>
                            <CardText>{deskripsi}</CardText>
                        </Card>
                    </a>
                </div>
            )
        })
        return produk;
    }
    render(){
        return(
            <div className="main">
                <CarouselSlide style={{widht: '100%'}}/>
                <div className="row">
                    {this.renderListProduk()}
                </div>
            </div>
        )
    }
}

export default Home;