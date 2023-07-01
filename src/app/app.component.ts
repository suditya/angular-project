import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import Chance from 'chance';
import { ToastrService } from 'ngx-toastr';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg4xOz02fw2YwFqRZeM9oGqsjqJqKFlIQ",
  authDomain: "users-winners-toppers-34e56.firebaseapp.com",
  databaseURL: "https://users-winners-toppers-34e56-default-rtdb.firebaseio.com",
  projectId: "users-winners-toppers-34e56",
  storageBucket: "users-winners-toppers-34e56.appspot.com",
  messagingSenderId: "979551235129",
  appId: "1:979551235129:web:f7f4356641e52c2ba9b1e8",
  measurementId: "G-339HF2NY8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  activeTab: string = 'users';
  users: any[] = [];
  winners: any[] = [];

  constructor(private toastr: ToastrService) {
    console.log('ToastrService:', this.toastr);
    firebase.initializeApp(firebaseConfig);
  }
  // constructor() { }


  ngOnInit(): void {
    // this.seedDatabase(); // Seed the database when the component initializes
    this.fetchUsers();
    this.fetchWinners();
  }

  seedDatabase(): void {
    const database = firebase.database();
    const usersRef = database.ref('users');

    const numRecords = 200; // Number of random records to generate
    const chance = new Chance(); // Create an instance of Chance

    for (let i = 0; i < numRecords; i++) {
      const randomData = {
        name: chance.name(), // Generate a random name using Chance
        age: generateRandomAge(),
        score: generateRandomScore(),
      };

      usersRef.push(randomData)
        .then(() => {
          console.log('Random data added successfully.');
        })
        .catch((error) => {
          console.error('Error adding random data:', error);
        });
    }
  }

  fetchUsers(): void {
    const database = firebase.database();
    const usersRef = database.ref('users');

    usersRef.on('value', (snapshot) => {
      const usersData = snapshot.val();

      if (usersData) {
        this.users = Object.values(usersData);
        console.log('Users array:', this.users);
      } else {
        console.log('No users found.');
      }
    }, (error) => {
      console.error('Error retrieving data:', error);
    });
  }

  fetchWinners(): void {
    const database = firebase.database();
    const winnersRef = database.ref('winners');

    winnersRef.on('value', (snapshot) => {
      const winnersData = snapshot.val();

      if (winnersData) {
        this.winners = Object.values(winnersData);
        console.log('Winners array:', this.winners);
      } else {
        console.log('No winners found.');
      }
    }, (error) => {
      console.error('Error retrieving winners data:', error);
    });
  }

  addToWinners(user: any): void {
    const confirmAdd = confirm(`Add ${user.name} to winners?`);
    if (confirmAdd) {
      this.winners.push({ name: user.name, age: user.age, score: user.score });
  
      const database = firebase.database();
      const winnersRef = database.ref('winners');
      winnersRef.push({ name: user.name, age: user.age, score: user.score })
        .then(() => {
          this.toastr.success(`${user.name} added to winners!`);
        })
        .catch((error) => {
          this.toastr.error('Error adding user to winners.');
          console.error('Error adding user to winners:', error);
        });
    }
  }
}

// Helper functions to generate random data
function generateRandomAge(): number {
  return Math.floor(Math.random() * 50) + 20; // Random age between 20 and 69
}

function generateRandomScore(): number {
  return Math.floor(Math.random() * 100) + 1; // Random score between 1 and 100
}
