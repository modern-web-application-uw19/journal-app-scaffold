import React from 'react';
import firebase from 'firebase';

// TODO: #2 Initialize firestore
// const db = firebase.firestore();

export default class Journal extends React.Component {
    state = {
        journalEntries: [],
        entry: ''
    }

    componentDidMount() {
        // TODO: #3 Subscribe to a collection and "observe" any data changes, then put in state
        // this.unsubscribeJournal = db
        //     .collection('journalEntries')
        //     .onSnapshot(snapshot => {
        //         this.setState({
        //             journalEntries: snapshot.docs
        //         });
        //     });
    }

    componentWillUnmount() {
        // TODO: #4 Unsubscribe on unMount
        // this.unsubscribeJournal();
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
        // TODO: #6 Push data to collection
        // db
        //     .collection('journalEntries')
        //     .add({entry: this.state.entry});

        // Clear the input field
        this.setState({entry: ''});
    }

    render() {
        const journalEntries = this.state.journalEntries.map(journalEntry => {
            // TODO: #5 Map through collection and access .id and .data() for id/data respectively
            // return (
            //     // .id gets the generated id for this object
            //     <li key={journalEntry.id}>
            //         {/* .data() gets the object stored */}
            //         {journalEntry.data().entry}
            //     </li>
            // );
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