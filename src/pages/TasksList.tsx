import '../style/user.css';
import '../style/task.css';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import pencil from "@/assets/editUser.png";
import arrow from "@/assets/right-arrow-upd.png";
import {Label} from "@/components/ui/label.tsx";
import delTeamUserButt from "@/assets/delTeamUser.png";
import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Calendar28} from "@/pages/VacationList.tsx";

export function DialogDemo({ user, tasks }) {
    const [dateTask, setDateTask] = useState("");
    const [taskContent, setTaskContent] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = (e) => {
        setTaskContent(e.target.value);
        setIsTyping(e.target.value.length > 0); // Show calendar if input is not empty
    };

    const handleSubmit = () => {
        if (taskContent && dateTask) {
            const newTask = {
                content: taskContent,
                id_user: user.id, // Assuming user.id is the ID of the user
                end_date: dateTask.toISOString() // Convert date to ISO string
            };

            axios.post('http://localhost:5000/api/tasks/new', newTask)
                .then(response => {
                    console.log("Task added successfully:", response.data);
                    // Optionally, reset the input and date
                    setTaskContent("");
                    setDateTask("");
                    setIsTyping(false);
                })
                .catch(error => {
                    console.error("Error adding task:", error);
                });
        } else {
            alert("Пожалуйста, заполните все поля."); // Alert if fields are empty
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={arrow} alt={"arrow right"} width={"60px"} className={"box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2)"}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%] p-15">
                <DialogHeader>
                    <DialogTitle>Меню задач</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid-cols-1 items-center gap-4 hrTitle">
                        <p>Сотрудник: {user.fname} {user.lname}</p>
                    </div>
                    <div className="grid items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Предстоящие задачи:
                        </Label>
                        <ol className={'liTeam'}>
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <li key={index}>{task.content}</li>
                                ))
                            ) : (
                                <li>Нет предстоящих задач</li>
                            )}
                        </ol>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 hrTitle py-2">
                        <input
                            id="name"
                            type={'text'}
                            placeholder={"Напишите задачу"}
                            className="col-span-3 outlineFocus"
                            value={taskContent}
                            onChange={handleInputChange}
                        />
                    </div>
                    {isTyping && (
                        <Calendar28
                            plcHolder={"Срок задачи"}
                            onChange={(date) => setDateTask(date)} // Set start date
                        />
                    )}
                </div>
                <DialogFooter>
                    <Button type="button" variant={"yellow"} onClick={handleSubmit}>Добавить задачу</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function TasksList() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [taskLists, setTaskLists] = useState({}); // Changed to store tasks

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users")
            .then((response) => {
                setData(response.data);
                // Fetch tasks for each user
                const tasksPromises = response.data.map(user =>
                    axios.get(`http://localhost:5000/api/users/${user.id}/tasks`)
                        .then((taskResponse) => {
                            return { id: user.id, tasks: taskResponse.data.user }; // Assuming the response contains an array of tasks
                        })
                );

                Promise.all(tasksPromises)
                    .then(results => {
                        const tasksMap = {};
                        results.forEach(result => {
                            tasksMap[result.id] = result.tasks; // Store tasks by user ID
                        });
                        setTaskLists(tasksMap);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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
                        <input type={'text'} className={'searchUser'} placeholder={'Поиск сотрудника'} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <button type={'submit'} className={'buttonSearch'}/>
                    </div>
                </div>
                <div className={'columnUser'}>
                    {filteredUsers.map(user => (
                        <div className={'rowUserTask'} key={user.id}>
                            <div className={'divUser1'}>
                                <p className={'nameUser'} id={'nameUser'}>{user.fname} {user.lname}</p>
                            </div>
                            <div className={'divUser2'}>
                                <p>Задач: {taskLists[user.id] ? taskLists[user.id].length : 0}</p>
                            </div>
                            <div className={'divUser2'}>
                                <p>{user.post}</p>
                            </div>
                            <div className={'divUser3'}>
                                <DialogDemo user={user} tasks={taskLists[user.id] || []}/> {/* Pass tasks to DialogDemo */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default TasksList;