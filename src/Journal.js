import React from 'react';
import firebase from 'firebase';

const db = firebase.firestore();

export default class Journal extends React.Component {
    state = {
        journalEntries: [],
        entry: ''
    }

    componentDidMount() {
        this.unsubscribeJournal = db
            .collection('journalEntries')
            .onSnapshot(snapshot => {
                this.setState({
                    journalEntries: snapshot.docs
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribeJournal();
    }

    // Sets the input field onChange
    onEntryChange = (event) => {
        const entry = event.target.value;
        this.setState({entry});
    }

    addJournalEntry = (event) => {
        // Prevent default form action (will otherwise cause a redirect)
        event.preventDefault();

        // Push a journal entry object to /journalEntries
        db
            .collection('journalEntries')
            .add({entry: this.state.entry});

        // Clear the input field
        this.setState({entry: ''});
    }

    render() {
        const journalEntries = this.state.journalEntries.map(journalEntry => {
            return (
                // .id gets the generated id for this object
                <li key={journalEntry.id}>
                    {/* .data() gets the object stored */}
                    {journalEntry.data().entry}
                </li>
            );
        });

        return (
            <div>
                <h1>Journal</h1>
                <form onSubmit={this.addJournalEntry}>
                    <input onChange={this.onEntryChange} value={this.state.entry} />
                    <button type="submit">Add</button>
                </form>

                <ul>
                    {journalEntries}
                </ul>
            </div>
        )
    }
}