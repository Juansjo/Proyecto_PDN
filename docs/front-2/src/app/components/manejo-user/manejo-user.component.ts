import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';



@Component({
  selector: 'app-manejo-user',
  templateUrl: './manejo-user.component.html',
  styleUrls: ['./manejo-user.component.scss'],
  standalone: false
})
export class ManejoUserComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  sortField: string = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'desc';
  searchTerm: string = '';

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.firestore.collection('users').valueChanges({ idField: 'id' })
      .pipe(
        map((users: any[]) => users.map(user => ({
          ...user,
          createdAt: this.convertTimestamp(user.createdAt),
          lastLogin: this.convertTimestamp(user.lastLogin)
        })))
      )
      .subscribe((users: User[]) => {
        this.users = users;
        this.filteredUsers = [...this.users];
        this.sortUsers();
      });
  }

  private convertTimestamp(timestamp: any): Date | null {
    if (!timestamp) return null;
    return timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  }

  sortUsers(field: string = this.sortField) {
    this.sortField = field;
    this.filteredUsers.sort((a, b) => {
      // Extraemos valores considerando campos de fecha
      const valA = this.getSortableValue(a, field);
      const valB = this.getSortableValue(b, field);
  
      // Comparación numérica para fechas, string para otros
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  private getSortableValue(user: User, field: string): string | number {
    const value = user[field as keyof User];
    
    if (field === 'createdAt' || field === 'lastLogin') {
      return value ? (value as Date).getTime() : 0;
    }
    
    // Para otros campos, usar string en minúsculas
    return typeof value === 'string' ? value.toLowerCase() : value || '';
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortUsers();
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user => 
        (user.email?.toLowerCase().includes(term)) || 
        (user.displayName?.toLowerCase().includes(term))
      );
    }
    
    this.sortUsers();
  }
}