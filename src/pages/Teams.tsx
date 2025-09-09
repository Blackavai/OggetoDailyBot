import '../style/team.css';
import arrow from '../assets/right-arrow-upd.png';
import delTeamUserButt from '../assets/delTeamUser.png';
import addUserNewTeam from '../assets/addUserTeam.png';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import React, { useEffect, useState } from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";

export function SelectUser({ selectedUsers, setSelectedUsers }) {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSelectUser = (user) => {
        setSelectedUsers((prev) => {
            if (prev.some((u) => u.id === user.id)) {
                // Remove user if already selected
                return prev.filter((u) => u.id !== user.id);
            } else {
                // Add user if not selected
                return [...prev, user];
            }
        });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="flex w-30"
                >
                    <img src={addUserNewTeam} className="w-auto h-auto" alt="Добавить пользователя"/>
                    <p>Добавить</p>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Начните вводить ФИО"/>
                    <CommandList>
                        <CommandEmpty>Пользователь не найден</CommandEmpty>
                        <CommandGroup>
                            {users.map((user) => (
                                <CommandItem
                                    key={user.id}
                                    onSelect={() => handleSelectUser(user)}
                                >
                                    <CheckIcon
                                        className={selectedUsers.some((u) => u.id === user.id) ? "opacity-100" : "opacity-0"}
                                    />
                                    <div className={"userList"}>
                                        <p>{user.fname} {user.lname}</p>
                                        <span>{user.post}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export function DialogMenuTeam({ team, deleteTeam, updateTeamData }) {
    const [dataTeam, setDataTeam] = useState([]);
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState(team.name_team);
    const [teamDescription, setTeamDescription] = useState(team.description_team);
    const [selectNewUser, setSelectNewUder] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/teams/view/${team.id}`)
            .then((response) => {
                console.log(response);
                setDataTeam(response.data.view);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [team.id]);

    const deleteUserTeam = (id_user) => {
        axios
            .post(`http://localhost:5000/api/teams/delUserTeam/${id_user}`)
            .then((response) => {
                console.log("Участник удален:", response.data);
                setDataTeam((prevData) => prevData.filter(member => member.id !== id_user));
            })
            .catch((error) => {
                console.error("Ошибка при удалении участника:", error);
            });
    }

    const saveTeamData = (id_team) => {
        axios
            .put(`http://localhost:5000/api/teams/edit/${id_team}`, {
                newNameTeam: teamName,
                descriptionTeam: teamDescription,
            })
            .then((response) => {
                return axios.post(`http://localhost:5000/api/teams/newUserTeam/${id_team}`, {
                    usersId: selectNewUser.map(user => user.id), // Передаем только id новых пользователей
                });
            })
            .then((userResponse) => {
                console.log("Пользователи добавлены в команду:", userResponse.data);
                console.log("Данные команды обновлены:", response.data);
                updateTeamData({ id: id_team, name_team: teamName, description_team: teamDescription });
                setOpen(false);
            })
            .catch((error) => {
                console.error("Ошибка при сохранении данных команды:", error);
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={arrow} alt={"arrow right"} width={"60px"} className={"box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2)"} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%] p-15">
                <DialogHeader>
                    <DialogTitle>Меню команды</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4 hrTitle">
                        <input
                            id="name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="col-span-3 outlineFocus w-full"
                        />
                    </div>
                    <div className="items-center hrTitle">
                        <Label htmlFor="username" className="text-right ">
                            Описание:
                            <input
                                id="username"
                                className="col-span-3 outlineFocus w-full"
                                value={teamDescription}
                                onChange={(e) => setTeamDescription(e.target.value)}
                            />
                        </Label>
                    </div>
                    <div className="grid items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Участники команды:
                        </Label>
                        <ol className={'liTeam'}>
                            {dataTeam.length > 0 || selectNewUser.length > 0 ? (
                                <>
                                {dataTeam.map((member, index) => (
                                    <li key={index}>
                                        {member.fname + " " + member.lname}
                                        <button onClick={() => deleteUserTeam(member.id)} key={member.id}>
                                            <img src={delTeamUserButt} alt={''} className="w-6 h-6 "/>
                                        </button>
                                    </li>
                                ))}
                                {selectNewUser.map((member, index) => (
                                    <li key={index}>
                                        {member.fname + " " + member.lname}
                                    </li>
                                ))}
                                </>
                            ) : (
                                <li>Участников нет</li>
                            )}
                        </ol>
                        <SelectUser selectedUsers={selectNewUser} setSelectedUsers={setSelectNewUder} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" variant={"yellow"} onClick={() => saveTeamData(team.id)}>Сохранить</Button>
                    <Button type="submit" variant={"red"} onClick={() => deleteTeam(team.id)}>Удалить команду</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function DialogAddTeam() {
    const [newUserTeam, setNewUserTeam] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [open, setOpen] = useState(false);

    const handleRemoveUser = (userId) => {
        setNewUserTeam((prev) => prev.filter((user) => user.id !== userId));
    };

    const addTeamData = () => {
        axios
            .post(`http://localhost:5000/api/teams/create`, {
                nameTeam: teamName,
                descriptionTeam: teamDescription,
            })
            .then((response) => {
                const id_team = response.data.task.id; // Получаем ID созданной команды
                return axios.post(`http://localhost:5000/api/teams/newUserTeam/${id_team}`, {
                    usersId: newUserTeam.map(user => user.id),
                });
            })
            .then((userResponse) => {
                console.log("Пользователи добавлены в команду:", userResponse.data);
                console.log("Данные команды обновлены:", userResponse.data);
                setOpen(false); // Закрыть диалог после успешного сохранения
            })
            .catch((error) => {
                console.error("Ошибка при сохранении данных команды:", error);
            });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button type={'button'} className={'addTeam'}></button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%] p-15">
                <DialogHeader>
                    <DialogTitle>Создание команды</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4 hrTitle">
                        <input
                            id="name"
                            placeholder="Название"
                            className="col-span-3 outlineFocus"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 hrTitle">
                        <Label htmlFor="username" className="text-right">
                            Описание:
                            <input
                                id="username"
                                placeholder="Введите описание"
                                className="col-span-3 outlineFocus"
                                value={teamDescription}
                                onChange={(e) => setTeamDescription(e.target.value)}
                            />
                        </Label>
                    </div>
                    <div className="grid items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Участники команды:
                        </Label>
                        {newUserTeam.length === 0 ? (
                            <p>Участников нет</p>
                        ) : (
                            <ol type={"1"} className={'liTeam'}>
                                {newUserTeam.map((user) => (
                                    <li key={user.id}>
                                        {user.fname} {user.lname}
                                        <button onClick={() => handleRemoveUser(user.id)}>
                                            <img src={delTeamUserButt} alt={''} className="w-6 h-6 "/>
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        )}
                        <SelectUser selectedUsers={newUserTeam} setSelectedUsers={setNewUserTeam} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant={"yellow"} onClick={addTeamData}>Сохранить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function Teams() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/teams/")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filteredTeams = data.filter(user =>
        `${user.name_team}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteTeam = (id_team) => {
        axios
            .delete(`http://localhost:5000/api/teams/delete/${id_team}`)
            .then((response) => {
                console.log("Участник удален:", response.data);
                setData((prevData) => prevData.filter(team => team.id !== id_team));
            })
            .catch((error) => {
                console.error("Ошибка при удалении команды:", error);
            });
    }
    const updateTeamData = (updatedTeam) => {
        setData((prevData) =>
            prevData.map(team =>
                team.id === updatedTeam.id ? updatedTeam : team
            )
        );
    };
    return (
        <div>
            <div className={'mainBlockTeam'}>
                <div className={'titleTeam'}>
                    <p>Команды</p>
                    <div className={'formSearch'}>
                        <input
                            type={'text'}
                            className={'searchTeam'}
                            placeholder={'Поиск команды'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type={'submit'} className={'buttonSearch'} />
                    </div>

                    <DialogAddTeam/>
                </div>
                <div className={'columnTeam'}>
                    {filteredTeams.map(teams => (
                    <div className={'rowTeam'}>
                        <div>
                            <p className={'nameTeam'} id={'nameTeam'}>{teams.name_team}</p>
                        </div>

                        <DialogMenuTeam team={teams} deleteTeam={deleteTeam} updateTeamData={updateTeamData}/>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
        ;
}

export default Teams;