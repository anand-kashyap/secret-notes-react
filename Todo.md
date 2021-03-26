Overview
In this project you will create a secret note creator. This application will allow users to create notes
and choose an “encryption type” to encrypt their message. For example, if the user chooses
“backwards” for the note “Maggi noodles are tasty”, the app would create the note “ytsat era
seldoon iggaM”. In addition, the application will have the ability to decrypt the posted note. In our
“ytsat era seldoon iggaM” example, the decrypted message would show “Maggi noodles are tasty”.
Technical requirements

1. A Vue.js front-end and Node.js backend app which allows for Creating, Reading, Updating,
   and Deleting notes. You may choose whichever database you’d like.
2. A form which takes two inputs and Creates a note:
   - A text input for the message
   - A dropdown of encryption type options, which include (but are not limited to):
     - Backwards
     - Emo-gize (a 1:1 mapping of letters to emojis - numbers or special characters noninclusive)
     - Letter-scramble (a 1:1 mapping of one letter to another)
     - Nothing (choosing this option will not encrypt the message)

- Reactive form validation with error messages
  - Input must not be empty

3. A page to view or Read all notes

   - Each note should include:
     - The encrypted message
     - A timestamp
     - The ability to show or Read the decrypted message
     - The ability to Delete a note
     - The ability to Update a note

4. Make it look nice: no hard guidelines here but we want ease of use
   - We encourage you to use external libraries (such as Bootstrap) that apply basic
     styling to the form

The purpose of this assignment is to see how you implement your learning. The minimum
requirement is that your app runs. You have one week from today to complete this project. When
you are ready, please submit a .zip file to your project with instructions on how to start your app.
