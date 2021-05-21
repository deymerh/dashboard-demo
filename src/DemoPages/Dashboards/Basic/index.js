import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import {
    AreaChart, Area, Line,
    ResponsiveContainer,
    Bar,
    BarChart,
    ComposedChart,
    CartesianGrid,
    Tooltip,
    LineChart
} from 'recharts';

import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../assets/utils/images/avatars/4.jpg';




let resultado = [];
/**************************************************************************************************************/
const axios = require('axios').default;

/*******************************************************/
const instanceLogin = axios.create({
    baseURL: 'https://gdp-api-eu.telemedcare.com/',
    timeout: 5000,

})
/*****************************************************/
const instanceAPI = axios.create({
    baseURL: 'https://gdp-api-eu.telemedcare.com/',

});
/********************************************************/
export default class AnalyticsDashboard1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        }
        this.getData = this.getData.bind(this)
    }
    async getData() {
        const { data } = await instanceLogin.post('doLogin', {
            "username": "josecarlos.sanguino",
            "password": "Sanguino@2021"
        })
        localStorage.setItem('token', data.item.userLogged.token);
        localStorage.setItem('groupId', data.item.userLogged.groupId);
        localStorage.setItem('userId', data.item.userLogged.id);

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                token: data.item.userLogged.token
            }
        }
        const resultado = await instanceAPI.get('patients?filter=&init=0&size=10', axiosConfig)
        this.setState({
            result: resultado.data.item.items
        })
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <Fragment>

                <div>
                    <PageTitle
                        heading="Primera prueba"
                        subheading="Esto es un ejemplo llamada API Pacientes"
                        icon="pe-7s-car icon-gradient bg-mean-fruit"
                    />

                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <div className="card-header">Active Users
                                        <div className="btn-actions-pane-right">
                                        <div role="group" className="btn-group-sm btn-group">
                                            <button className="active btn btn-info">Last Week</button>
                                            <button className="btn btn-info">All Month</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Complete name</th>
                                                <th>Phone</th>
                                                <th className="text-center">Access</th>
                                                <th className="text-center">Group</th>
                                                <th className="text-center">Actions</th>
                                                <th className="text-center">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.result.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-center text-muted">{item.firstName} {item.lastName}</td>
                                                            <td>
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left mr-3">
                                                                            <div className="widget-content-left">
                                                                                <img width={40} className="rounded-circle" src={avatar4} alt="Avatar" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="widget-content-left flex2">
                                                                            <div className="widget-heading">{item.username}</div>
                                                                            <div className="widget-subheading opacity-7">Web Developer</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-center">{item.access}</td>
                                                            <td className="text-center">
                                                                <div className="badge badge-warning">Pending</div>
                                                            </td>
                                                            <td className="text-center">
                                                                <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </Card>
                        </Col>
                    </Row>

                </div>

            </Fragment>
        )
    }
}
