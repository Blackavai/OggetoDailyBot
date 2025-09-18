import '../style/user.css';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import pencil from "@/assets/editUser.png";
import axios from 'axios';
import React, { useEffect, useState } from "react";
export function DialogDemo({user}) {
    const [CheckTeam, setCheckTeam] = useState([]);
    const [CheckVac, setCheckVac] = useState([]);
    const [CheckTask, setCheckTask] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${user.id}/team`)
            .then((response) => {
                setCheckTeam(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${user.id}/vacation`)
            .then((response) => {
                setCheckVac(response.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user.id]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${user.id}/tasks`)
            .then((response) => {
                setCheckTask(response.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user.id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={pencil} alt={"arrow right"} width={"60px"}
                     className={"box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2) btnInteractive"}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%] p-15">
                <DialogHeader>
                    <DialogTitle>Меню сотрудника</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className=" grid-cols-1 items-center gap-4 hrTitle">
                        <p>{user.fname} {user.lname}</p>
                    </div>
                    <div className=" grid-cols-1 items-center gap-1 hrTitle">
                        <p>Роль: {user.post}</p>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4 hrTitle">
                        <p>ID: {user.tg_id}</p>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4 hrTitle">
                        <p>Команда: {CheckTeam.user}</p>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4 hrTitle">
                        <p>Отпуск: {CheckVac.start_holiday && CheckVac.end_holiday ? `${formatDate(CheckVac.start_holiday)} - ${formatDate(CheckVac.end_holiday)}` : "Отсутсвует"}</p>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4 hrTitle">
                        <p>Задач стоит: {CheckTask.length}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function User() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filteredUsers = data.filter(user =>
        `${user.fname} ${user.lname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className={'mainBlockUser'}>
                <div className={'titleUser'}>
                    <p>Сотрудники</p>
                    <div className={'formSearch'}>
                        <input
                            type={'text'}
                            className={'searchUser'}
                            placeholder={'Поиск сотрудника'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type={'submit'} className={'buttonSearch'}/>
                    </div>
                </div>
                <div className={'columnUser'}>
                    {filteredUsers.length === 0 ?(
                        <p>Сотрудники отсутсвуют</p>
                    ) : (
                    filteredUsers.map(user => (
                        <div className={'rowUser'} key={user.id}>
                            <div className={'divUser1'}>
                                <p className={'nameUser'} id={'nameUser'}>{user.fname} {user.lname}</p>
                            </div>
                            <div className={'divUser2'}>
                                <p>{user.post}</p>
                            </div>
                            <div className={'divUser3'}>
                                <DialogDemo user={user}/>
                            </div>
                        </div>
                    ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default User;