import { Card, Table } from 'antd'
import React from 'react';
import { getAdvancedDocuments, downloadZip } from '../services/docsService'
import { DownloadOutlined, SearchOutlined, UserOutlined, MoneyCollectOutlined, FieldNumberOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { message, Input, Col, Row, Divider, Button, DatePicker } from 'antd';
import Spinner from './spinner/spinner'
import logo from '../assests/img/biat-logo.jpg'


export default class TableFiles extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            files: '',
            accountNumber: '',
            clientCode: '',
            agenceCompte: '',
            dateStart: '',
            dateEnd: '',
            devise:'',
            size: 'large',
            loading: true,
            loadingBtnValider: false,
            loadingBtnDownload: false,
            colorSearch: 'black',
            searchValue: '',
            currentData: [],
            result: ''
        };
        this._isMounted = false;


    }




    componentDidMount() {
        this._isMounted = true;
        let data = {
            accountNumber: this.state.accountNumber,
            clientCode: this.state.clientCode,
            agenceCompte: this.state.agenceCompte,
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            devise: this.state.devise
        }
        getAdvancedDocuments(data)
            .then(res => this._isMounted && this.setState({ files: res.docs, currentData: res.docs, loading: false }))
            .catch(err => {
                console.log('Oops!! Quelque chose a mal tournée chez nous, S\'il vous plaît rafraîchir cette page', err)
                this.setState({ loading: false })
            })
    }

    

    download = (files) => {
        this.setState({
            loading: true,
            loadingBtnDownload: true

        })
        downloadZip(files.join(','))
            .then(res => {
                this.setState({
                    selectedRowKeys: [],
                    loading: false,
                    loadingBtnDownload: false
                })
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                let date = new Date();
                let name = 'biat_' + date.getFullYear() + date.getMonth() + date.getUTCDay() + date.getUTCHours() + date.getUTCMinutes() + date.getUTCSeconds() + '.zip'
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
                message.info(`Success Download`);
            })
            .catch(err => {
                console.log('erreur de produit ', err)
                message.info(`Failed Download Try Again !!`);
                this.setState({
                    loading: false,
                    loadingBtnDownload: false
                })
            })

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleDateChange = (e, value) => {

        let current_datetime = new Date(e);
        let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear()
        if (value === "start") {
            if (!e) {
                this._isMounted && this.setState({ dateStart: "" });
            }
            else this._isMounted && this.setState({ dateStart: formatted_date });
        }
        else {
            if (!e) {
                this._isMounted && this.setState({ dateEnd: "" });
            }
            else this._isMounted && this.setState({ dateEnd: formatted_date });
        }
    }



    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    search = () => {
        this.setState({
            loading: true,
            loadingBtnValider: true
        })
        let data = {
            accountNumber: this.state.accountNumber,
            clientCode: this.state.clientCode,
            agenceCompte: this.state.agenceCompte,
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            devise: this.state.devise
        }
        getAdvancedDocuments(data)
            .then(res => this._isMounted && this.setState({ files: res.docs, loading: false, loadingBtnValider: false, currentData: res.docs }))
            .catch(err => {
                console.log('Oops!! Quelque chose a mal tournée chez nous, S\'il vous plaît rafraîchir cette page', err)
                this.setState({ loading: false, loadingBtnValider: false })
            })
    }

    //Search function : search a specific bill
    searchList = (e) => {
        this._isMounted && this.setState({ searchValue: e.target.value })
        let searchedValue = e.target.value
        let dataFIlteredBySearch = this.state.files.filter(el =>
            (el.accountingDate && el.accountingDate.toLowerCase().includes(searchedValue.toLowerCase()))
            ||
            (el.editionTime && el.editionTime.toLowerCase().includes(searchedValue.toLowerCase()))
            ||
            (el.typeDocument && el.typeDocument.toLowerCase().includes(searchedValue.toLowerCase()))
            ||
            (el.userCode && el.userCode.toLowerCase().includes(searchedValue.toLowerCase()))
            ||
            (el.accountNumber && el.accountNumber.toLowerCase().includes(searchedValue.toLowerCase()))
            ||
            (el.clientCode && el.clientCode.toLowerCase().includes(searchedValue.toLowerCase()))
        )
        if (dataFIlteredBySearch.length === 0) {
            this._isMounted && this.setState({
                currentData: this.state.files,
                colorSearch: "red",
                result: "Recherche invalide :rien ne correspond à vos critères de recherche"
            })
        }
        else {
            this._isMounted && this.setState({
                currentData: dataFIlteredBySearch,
                result: "Recherche valide"
            })
            if (searchedValue) this._isMounted && this.setState({ colorSearch: "green" })
            else this._isMounted && this.setState({
                colorSearch: "black",
                result: ""
            })
        }

    }



    render() {
        const columns = [
            {
                title: 'Date Comptable',
                dataIndex: 'accountingDate',
                sorter: (a, b) => a.accountingDate < b.accountingDate,
                defaultSortOrder: 'descend',
            },
            {
                title: 'Heure',
                dataIndex: 'editionTime',
                sorter: (a, b) => a.editionTime < b.editionTime,
                defaultSortOrder: 'descend',
            },
            {
                title: 'Type du fichier',
                dataIndex: 'typeDocument',
                sorter: (a, b) => a.typeDocument < b.typeDocument,
                defaultSortOrder: 'descend',
            },
            {
                title: 'Matricule Utilisateur',
                dataIndex: 'userCode',
                sorter: (a, b) => a.userCode < b.userCode,
                defaultSortOrder: 'descend',
            },
            {
                title: 'Numéro du Compte',
                dataIndex: 'accountNumber',
                sorter: (a, b) => a.accountNumber < b.accountNumber,
                defaultSortOrder: 'descend',
            },
            {
                title: 'Code client',
                dataIndex: 'clientCode',
                sorter: (a, b) => a.clientCode < b.clientCode,
                defaultSortOrder: 'descend',
            },
            {
                title: 'Télecharger',
                dataIndex: 'key',
                key: 'key',
                render: (key) =><div style={{textAlign:'center'}}><CloudDownloadOutlined style={{ color: "#3ec769", fontSize: "20px", paddingLeft: "17px",paddingRight: "17px",boxShadow:'2px 2px 2px 2px #3ec769' }} onClick={() => this.download([key])} /></div>
            }



        ];

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };



        return (<>
            <Card>
                <Divider orientation="left"><img src={logo} alt='logo' style={{ width: '50px', height: '50px' }} /></Divider>
                <Divider orientation="left">Information du Compte</Divider>
                <Row>
                    <Col span={1}></Col>
                    <Col span={6}>Numéro du compte : <Input prefix={<FieldNumberOutlined />} placeholder='Numéro de compte' name='accountNumber' onChange={this.handleChange}></Input> </Col>
                    <Col span={2}></Col>
                    <Col span={6}>Agence du compte : <Input prefix={<MoneyCollectOutlined />} placeholder="Agence de compte" name='agenceCompte' onChange={this.handleChange}></Input> </Col>
                    <Col span={2}></Col>
                    <Col span={6}>Devise du compte : <Input prefix={<UserOutlined />} placeholder='Devise de compte' name='devise' onChange={this.handleChange}></Input> </Col>
                    </Row>
                <Divider orientation="left">Autres</Divider>
                <Row>
                    <Col span={1}></Col>
                    <Col span={4}>Code du Client : <Input prefix={<UserOutlined />} placeholder='Code de client' name='clientCode' onChange={this.handleChange}></Input> </Col>
                    <Col span={2}></Col>
                    <Col span={3}>Date début : <br></br><DatePicker onChange={(e) => this.handleDateChange(e, 'start')} /></Col>
                    <Col span={2}></Col>
                    <Col span={3}>Date Fin : <br></br><DatePicker onChange={(e) => this.handleDateChange(e, 'end')} /> </Col>
                    <Col span={2}></Col>
                    <Col span={6}><br /> <Button type="primary" icon={<SearchOutlined />} onClick={this.search} loading={this.state.loadingBtnValider}> Valider </Button> </Col>
                </Row>
                <Divider />
                {this.state.loading ? <Spinner text='get Files' /> : <>
                    <Row>
                        <Col span={6}></Col>
                        <Col span={12}>Recherche Rapide :
                        <Input prefix={<SearchOutlined />}
                                style={{
                                    border: `0.7px ${this.state.colorSearch}  solid`,
                                    boxShadow: `0px 2px 66px -17px  ${this.state.colorSearch} `
                                }}
                                id="inlineFormInputGroup"
                                placeholder="Search..."
                                type="text"
                                onChange={this.searchList}
                                value={this.state.searchValue}
                                autoFocus={true}
                            ></Input> </Col>
                        <Col span={6}></Col>
                    </Row>
                    <p style={{ textAlign: 'center', fontSize: "12px", color: this.state.colorSearch }}>{this.state.result}</p>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.currentData} />
                    <Row>
                        <Col span={22}></Col>
                        <Col span={2}><Button type="primary" loading={this.state.loadingBtnDownload} icon={<DownloadOutlined />} size={this.state.size} onClick={() => this.download(this.state.selectedRowKeys)} disabled={this.state.selectedRowKeys.length===0}> Download </Button></Col>
                    </Row>
                </>}
            </Card>
        </>);
    }
}

