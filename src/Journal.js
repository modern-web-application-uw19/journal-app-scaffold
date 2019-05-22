import React from 'react';
import firebase from 'firebase';

const db = firebase.firestore();

export default class Journal extends React.Component {
    state = {
        journalEntries: [],
        entry: '',
        title: ''
    }

    componentDidMount() {
        // TODO: #3 Subscribe to a collection and "observe" any data changes, then put in state
        this.unsubscribeJournal = db
            .collection('journalEntries')
            .orderBy('timeStamp')
            .onSnapshot(snapshot => {
                this.setState({
                    journalEntries: snapshot.docs
                });
            });
    }

    componentWillUnmount() {
        // TODO: #4 Unsubscribe on unMount
        this.unsubscribeJournal();
    }

    // Sets the input field onChange
    // onEntryChange = (event) => {
    //     const entry = event.target.value;
    //     this.setState({entry});
    // }

    // onTitleChange = (event) => {
    //     const title = event.target.value;
    //     this.setState({title});
    // }
    onChange = (event, fieldName) => {
        const value = event.target.value;
        const newState = {};
        newState[fieldName] = value;
        this.setState(newState);
    }

    addJournalEntry = (event) => {
        // Prevent default form action (will otherwise cause a redirect)
        event.preventDefault();

        // Push a journal entry object to /journalEntries
        db
            .collection('journalEntries')
            .add({
                entry: this.state.entry,
                title: this.state.title,
                timeStamp: Date.now()
            });

        // Clear the input field
        this.setState({entry: '', title: ''});
    }

    render() {
        const journalEntries = this.state
            .journalEntries.map(journalEntry => {
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
                    <label>Title</label>
                    <input onChange={event => this.onChange(event, 'title')} value={this.state.title} />

                    <label>Entry</label>
                    <textarea onChange={event => this.onChange(event, 'entry')} value={this.state.entry} />
                    <button type="submit">Add</button>
                </form>

                <ul>
                    {journalEntries}
                </ul>
            </div>
        )
    }
}