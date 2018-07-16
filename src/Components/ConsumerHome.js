import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners'; // npm install react-spinners --save
import ConsumerHeader from './ConsumerHeader'
import ProjectList from './ProjectList'
import data from '../data/data.json' // for local use

class ConsumerHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            projects: [],
            isSelected: false,
            category: null
        }
        this.showProjects = this.showProjects.bind(this);
        this.selected = this.selected.bind(this);
        this.reload = this.reload.bind(this);
    }

    // Fetch the updated projects and store in state
    componentWillMount() {
        axios.get('https://pilotsapp.herokuapp.com/project')
            .then(response => {
                console.log(response);
                this.setState({
                    projects: response.data,
                    loading: true
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Reloading the page
    reload(){
        window.location.reload();
    }

    // Filtering the selected project category
    selected(cat){
        var filtered = [];
        this.state.projects.map((project) => {
            project.category === cat ? filtered.push(project) : null;
        })
        this.setState({
            projects: filtered,
            isSelected: true,
            category: cat
        })
    }

    // Main category redner
    mainRender() {
        return (
            <div><p></p>
                <h5 style={{fontFamily: "ABeeZee, sans-serif", textAlign: 'center'}}>Categories</h5>                
                <div className='consumerHome'>
                    <div className="container">
                        <div className="row">
                        <div className="col" style={{backgroundImage: `url(${data[0].Drama})`, backgroundSize: 'cover', margin: '2px' }} onClick={() => this.selected("Drama")}> 
                            <p className="card-text" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#ffffff', paddingTop: "60px"}}>Drama</p>
                                <p className="card-text"><small className="text-muted">.</small></p>
                            </div>
                        <div className="col" style={{backgroundImage: `url(${data[1].Action})`, backgroundSize: 'cover', margin: '2px' }} onClick={() => this.selected("Action")}>
                            <p className="card-text" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#ffffff', paddingTop: "60px"}}>Action</p>
                                <p className="card-text"><small className="text-muted">.</small></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{backgroundImage: `url(${data[2].Porn})`, backgroundSize: 'cover', margin: '2px' }} onClick={() => this.selected("Porn")}>
                            <p className="card-text" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#ffffff', paddingTop: "60px"}}>Porn</p>
                                <p className="card-text"><small className="text-muted">.</small></p>
                            </div>
                        <div className="col" style={{backgroundImage: `url(${data[3].Comedy})`, backgroundSize: 'cover', margin: '2px' }} onClick={() => this.selected("Comedy")}>
                            <p className="card-text" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#ffffff', paddingTop: "60px"}}>Comedy</p>
                                <p className="card-text"><small className="text-muted">.</small></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{backgroundImage: `url(${data[4].Crime})`, backgroundSize: 'cover', margin: '2px' }} onClick={() => this.selected("Crime")}>
                            <p className="card-text" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#ffffff', paddingTop: "60px"}}>Crime</p>
                                <p className="card-text"><small className="text-muted">.</small></p>
                            </div>
                        <div className="col" style={{backgroundImage: `url(${data[5].Fantasy})`, backgroundSize: 'cover', margin: '2px' }} onClick={() => this.selected("Fantasy")}>
                            <p className="card-text" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#ffffff', paddingTop: "60px"}}>Fantasy</p>
                                <small className="text-muted">.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    // Showing all the projects to consumer
    showProjects(){
        return(
            <div><p></p>
                <div>
                    <h6 className="d-flex justify-content-center" style={{fontFamily: "ABeeZee, sans-serif", }}> {this.state.projects[0].category} </h6>
                </div>
                <div className='projectList'>
                    {this.state.projects.length ?
                    <ProjectList projects={this.state.projects}>
                    </ProjectList> :
                    <h3>No projects available under this category.</h3> }
                </div>
            </div>
        )
    }

    render() {
        return(
        <div>
            <ConsumerHeader></ConsumerHeader>
            <img alt="Profile Picture" src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl} style={{ height: '40px', width: '40px', float: 'right', borderRadius: '50%', padding: '3px 3px 3px 3px' }}></img>
            <div style={{ textAlign: 'left', justifyContent: 'center', marginTop: '10px'}}>
                <h6 style={{fontFamily: "ABeeZee, sans-serif"}}>Hello, {JSON.parse(sessionStorage.getItem('userPilotsDetails')).full_name}</h6>
            </div>
            {this.state.loading ? ( this.state.isSelected ? this.showProjects() : this.mainRender() ) :     
            <div className='sweet-loading'>
            <BeatLoader color={'#123abc'} />
          </div>}
        </div>
        )
    }
}

export default ConsumerHome; 