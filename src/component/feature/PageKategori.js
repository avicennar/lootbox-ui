import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {

    state = {categoryList: [], addKategori:'', selectedEditCategoryId:0}

    componentDidMount() {
       this.getListKategori();
    }

    getListKategori = () => {
        axios.get('http://localhost:2000/categories')
        .then((res) => {
            this.setState({ categoryList: res.data ,selectedEditCategoryId:0 })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var idKategori = this.refs.AddIdKategori.value;
        var nama = this.refs.AddNamaKategori.value;

        axios.post('http://localhost:2000/addkategori',{
            idKategori,nama
        })
        .then((res) => {
            alert('input kategori success')
            this.getListKategori();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')) {
            axios.delete('http://localhost:2000/deletekategori/' + id)
            .then((res) => {
                alert('Delete Success');
                this.getListKategori();
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    onBtnSaveClick = (id) => {
        var idKategori = this.refs.UpdateIdKategori.value;
        var nama = this.refs.UpdateNamaKategori.value;

        axios.post('http://localhost:2000/editkategori/' + id,{
            idKategori,nama
        })
        .then((res) => {
            alert('update sukses')
            this.getListKategori();
        })
        .catch((err) => {
            console.log(err)
        })     
    }

    renderCategoryList = () => {
        var listJSX = this.state.categoryList.map((item) => {
            if(item.id === this.state.selectedEditCategoryId) {
                return (
                    <tr>
                        <td><input type="text" ref="UpdateIdKategori" defaultValue={item.idKategori}/></td>
                        <td><input type="text" ref="UpdateNamaKategori" defaultValue={item.nama}/></td>
                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditCategoryId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnSaveClick(item.id)} /></td>
                    </tr>
                )
            }
            return(
                <tr>
                    <td>{item.idKategori}</td>
                    <td>{item.nama}</td>
                    <td><input type="button" class="btn btn-primary" value="Edit" onClick={() => this.setState({selectedEditCategoryId:item.id})} /></td>
                    <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                </tr>
                    
            )
        })
        return listJSX;
    }

    render () {
        return (
            <div>
                <center>
                    <h1>CATEGORY LIST</h1>
                        <table>
                            <thead> 
                               <th>Id kategori</th>
                               <th>Nama</th>
                               <th></th>
                               <th></th>
                            </thead>
                        <tbody>
                            {this.renderCategoryList()}
                        </tbody>
                            <tfoot>
                                <td><input type="text" ref="AddIdKategori"/></td>
                                <td><input type="text" ref="AddNamaKategori"/></td>
                                <td><input type="button" class="btn btn-success" value="addKategori" id="addKategori" onClick={this.onBtnAddClick} /></td>
                                <td></td>
                            </tfoot>
                        </table>
                </center>
            </div>
        )
    }

}

export default Categories;