import React from 'react'
import '../css/App.css'

class Leaderboard extends React.Component {

    constructor() {
        super();
        this.state = {
            leaderboard: {}
        }
    }

    getLeaderboard() {
        this.props.dbRef.once('value', snapshot => {
            const val = snapshot.val()
            this.setState({ leaderboard: val.leaderboard })
        })
    }

    componentWillMount() {
        this.getLeaderboard()
    }


    render() {

        console.log(this.props)

        return (
            <div class="ion-padding">
                <ion-row class="ion-align-items-center">
                    <ion-col>
                        <h1>Leaderboard</h1>
                    </ion-col>
                </ion-row>

                <ion-list>
                    {Object.entries(this.state.leaderboard).map((key) => {
                        const [name, score] = key
                        return (
                            <ion-item>
                                <ion-row class="ion-justify-content-around">
                                    <ion-col size="">
                                        <ion-label>1.</ion-label>
                                    </ion-col>
                                    <ion-col size="">
                                        <ion-label>{name}</ion-label>
                                    </ion-col>
                                    <ion-col size="" class="ion-align-self-end">
                                        <ion-label>{score}</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-item>
                        )
                    })
                    }
                </ion-list>
            </div>
        )
    }
}

export default Leaderboard;
