import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { NavLink } from 'react-router-dom'
import { Input } from "semantic-ui-react";
import { Radio } from "semantic-ui-react";
import { Rating } from 'semantic-ui-react'


export default function Recherche() {
    useEffect(() => {
        document.title = "Recherchez une activité"
     }, []);

    const [zipcode, setZipCode] = useState("");

    const [free, setFree] = useState("true");

    const [town, setTown] = useState("");
    const [dataTown, setDataTown] = useState("");
    const [activeChangeInput, setActiveChangeInput] = useState(false)
    const [limitData, setLimitData] = useState(5)

    const [dataActivity, setDataActivity] = useState();
    const [activityLength, setActivityLength] = useState(0)

    const [activityOpen, setActivityOpen] = useState(false)
    const [activityError,setActivityError] = useState()

    const inputCode = async () => {
        try {
            const responce = await axios.get(`https://geo.api.gouv.fr/communes?nom=${town}&fields=nom,codeDepartement&limit=${limitData}&boost=population`);
            setDataTown(responce.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const jsxVille = () => {
        if (activeChangeInput) {
            const res = dataTown.map(home => {
                const getName = () => {
                    setTown(home.nom)
                    document.querySelector("#form--activity ul").style.display = "none"
                    setZipCode(home.codeDepartement)
                }


                const jsx = <li onClick={getName} key={home.code}>{home.nom} ({home.codeDepartement})</li>
                return jsx
            })

            return res
        }
    }

    useEffect(() => {
        inputCode()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [town])



    const handleSubmit = async () => {
        const response = await axios.post("https://kidozanges.herokuapp.com/api/searchactivity", {
            town,
            free
        })

        if (response.data.activities) {
            setActivityOpen(true)
            setDataActivity(response.data.activities)
            setActivityLength(response.data.activities.length)
            
            console.log(response.data.activities)
            console.log(response.data.activities.length)
    
        }
        else {
            setActivityOpen(false)
            setActivityError(response.data.error)
            console.log(response.data.error)
        }
    }


    const jsxActivities = () => {
        const row = []

        if (activityOpen) {
            for (let i = 0; i < activityLength; i++) {
                const link = `/detailactivity/${dataActivity[i]?.id}`
                row.push(
                    <div className="box-card" key={dataActivity[i]?.id}>
                        <NavLink className="div-nav" to={link}>
                            <article className="article--main">
                                <div className="text">
                                    <h4>
                                        {dataActivity[i]?.title}
                                    </h4>
                                    <p>
                                        {dataActivity[i]?.description}
                                    </p>
                                    <button className = "article--button" > En savoir plus </button>
                                </div>

                                <div className="box--img--note">
                                    <img src={dataActivity[i]?.url} alt="" width="500" height="300" />
                                </div>

                            </article>
                        </NavLink>
                    </div>
                )
            }
        }
        else {
            row.push(<h2 id="h2--error" key="error">{activityError}</h2>)
        }

        return row
    }

    return (
        <div id="recherche">
            <h2 className = "body--title" >
                Recherchez les activités dans la ville de votre choix. 
            </h2>
            <Form id="form--activity" method="POST" onSubmit={handleSubmit}>
                <Form.Field
                    control={Input}
                    required

                    type="text"
                    name="town"
                    icon="search"
                    label="Ville"
                    placeholder="Veuillez sélectionner une ville"
                    value={town}
                    autoFocus
                    onChange={(evt) => {
                        setTown(evt.target.value);
                        setActiveChangeInput(true)
                        document.querySelector("#form--activity ul").style.display = "block"
                    }}
                />
                <ul>
                    {jsxVille()}
                </ul>

                <Form.Group inline>
                    <Form.Field
                        control={Radio}
                        label="Gratuite"
                        name="freeOrPaying"
                        value={free}
                        checked={free === "true"}
                        onChange={() => {
                            setFree("true");
                        }}
                    />
                    <Form.Field
                        control={Radio}
                        label="Payante"
                        name="freeOrPaying"
                        value={free}
                        checked={free === "false"}
                        onChange={() => {
                            setFree("false");
                        }}
                    />
                </Form.Group>


                <Button className="button-submit green" type="submit">
                    Rechercher
                </Button>
            </Form>


            <section id="main">
                {jsxActivities()}
            </section>
        </div>

    );

}
