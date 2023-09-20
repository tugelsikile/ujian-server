import React from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {logout} from "./Authentication";

const adminMenu = [
    { value: 'exam', label: 'Ujian', icon: 'fas fa-book-open', url: `${window.origin}/exam`,
        children: [
            { value: 'schedule', label: 'Jadwal Ujian', icon: 'fas fa-calendar', url: `${window.origin}/exam/schedule`, children: [], child_route: ['schedule'] },
            { value: 'client', label: 'Server Client', icon: 'fas fa-server', url: `${window.origin}/exam/client`, children: [], child_route: ['client'] },
            { value: 'participant', label: 'Peserta', icon: 'fas fa-users', url: `${window.origin}/exam/participant`, children: [], child_route: ['participant'] },
        ],
        child_route: ['schedule','client','participant','exam'],
    },
];
const userMenu = [
    { value: 'course', label: 'Mata Pelajaran', icon: 'fas fa-book', url: `${window.origin}/course`,
        children: [
            { value: 'topic', label: 'Bank Soal', icon: 'fas fa-tag', url: `${window.origin}/course/topic`, children: [], child_route: ['topic'] }
        ],
        child_route: ['topic','course'],
    },
];
const superMenu = [
    { value: 'major', label: 'Jurusan', icon: 'fas fa-traffic-light', url: `${window.origin}/major`, children: [], child_route: ['major'], },
    { value: 'user', label: 'Pengguna', icon: 'fas fa-user-secret', url: `${window.origin}/user`, children: [], child_route: ['user'] },
];
const MainHeader = ({...props})=> {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i className="fas fa-bars"/>
                    </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href={`${window.origin}/home`} className="nav-link">Dashboard</a>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"/>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
const MainSideBar = ({...props})=> {
    const menus = [
        { value: 'dashboard', label: 'Dashboard', icon: 'fas fa-th', url: `${window.origin}/home`, children: [] }
    ];
    if (props.user !== null) {
        switch (props.user.meta.level){
            case 'super':
                adminMenu.map((item)=>{ menus.push(item); });
                userMenu.map((item)=>{ menus.push(item); });
                superMenu.map((item)=>{ menus.push(item); });
                break;
            case 'user':
                userMenu.map((item)=>{ menus.push(item); });
                break;
            case 'participant':
                break;
        }
    }
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href={`${window.origin}/home`} className="brand-link">
                <img src={`${window.origin}/theme/adminlte/img/logo.png`} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity:.8}}/>
                <span className="brand-text font-weight-light">SERVER UJIAN</span>
            </a>

            <div className="sidebar">
                {props.user !== null &&
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={`${window.origin}/theme/adminlte/img/bear.png`} className="img-circle elevation-2" alt="User Image"/>
                        </div>
                        <div className="info">
                            <a href={`${window.origin}/user/profile/${props.user.value}`} className="d-block">{props.user.label}</a>
                        </div>
                    </div>
                }

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {menus.map((menu)=>
                            <MainSideBarMenu route={props.route} key={menu.value} menu={menu}/>
                        )}
                        {props.user !== null &&
                            <li className="nav-item">
                                <a onClick={(event)=>{ event.preventDefault(); logout(); }} href="#" className="nav-link text-warning">
                                    <i className={`nav-icon fas fa-power-off`}/>
                                    <p>Keluar</p>
                                </a>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
const MainSideBarMenuNoChildren = ({...props})=> {
    return (
        <li className="nav-item">
            <a href={props.menu.url} className={`nav-link ${props.route === props.menu.value ? 'active' : ''}`}>
                <i className={`nav-icon ${props.menu.icon}`}/>
                <p>{props.menu.label}</p>
            </a>
        </li>
    )
}
const MainSideBarMenuHasChildren = ({...props})=> {
    return (
        <li className={`nav-item ${props.menu.child_route.findIndex((f)=> f === props.route) >= 0 ? 'menu-open' : ''}`}>
            <a href="#" className={`nav-link ${props.route === props.menu.value ? 'active' : ''}`}>
                <i className={`nav-icon ${props.menu.icon}`}/>
                <p>
                    {props.menu.label}
                    <i className="fas fa-angle-left right"/>
                </p>
            </a>
            <ul className="nav nav-treeview">
                {props.menu.url !== null &&
                    <MainSideBarMenuNoChildren route={props.route} menu={props.menu}/>
                }
                {props.menu.children.map((item)=>
                    <MainSideBarMenu route={props.route} key={item.value} menu={item}/>
                )}
            </ul>
        </li>
    )
}
const MainSideBarMenu = ({...props})=> {
    return (
        props.menu !== null &&
            props.menu.children.length === 0 ?
                <MainSideBarMenuNoChildren {...props}/>
            :
                <MainSideBarMenuHasChildren {...props}/>
    )
}
export const HeaderAndSideBar = ({...props})=> {
    return (
        <React.Fragment>
            <ToastContainer/>
            <MainHeader {...props}/>
            <MainSideBar {...props}/>
        </React.Fragment>
    )
}
export const MainFooter = ()=> {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Version</b> 3.2.0
            </div>
            <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
        </footer>
    )
}
export const PageHeader = ({...props})=> {
    return (
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>{typeof props.title !== "undefined" && props.title}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href={`${window.origin}/home`}>Home</a></li>
                            {typeof props.children !== "undefined" && Array.isArray(props.children) && props.children.length > 0 &&
                                props.children.map((item,index)=>
                                    <li key={`breadcrumb-${index}`} className="breadcrumb-item">
                                        <a href={typeof item.url === "undefined" ? '#' : item.url}>{typeof item.label !== "undefined" && item.label}</a>
                                    </li>
                                )
                            }
                            {typeof props.title !== "undefined" &&
                                <li className="breadcrumb-item active">{props.title}</li>
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}