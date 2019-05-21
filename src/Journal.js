import React from 'react';
import firebase from 'firebase';

const db = firebase.firestore();

export default class Journal extends React.Component {
    state = {
        journalEntries: [],
        user: null,
        entry: ''
    }

    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            return this.props.history.push('/');
        }
        
        this.unsubscribeJournal = db
            .collection('users')
            .doc(currentUser.uid)
            .collection('journalEntries')
            .onSnapshot(snapshot => {
                this.setState({
                    journalEntries: snapshot.docs
                });
            });
    }

    // Check if the unsubscribeJournal reference exists (could possibly not exist
    // if the !currentUser branch was taken in componentDidMount)
    // This unsubscribe ensures there's not multiple listeners when navigating between pages
    componentWillUnmount() {
        if (this.unsubscribeJournal) {
            this.unsubscribeJournal();
        }
    }

    // Sets the input field onChange
    onEntryChange = (event) => {
        const entry = event.target.value;
        this.setState({entry});
    }

    addJournalEntry = (event) => {
        // Prevent default form action (will otherwise cause a redirect)
        event.preventDefault();

        // Push a journal entry object to /users/{uid}/journalEntries
        db
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
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