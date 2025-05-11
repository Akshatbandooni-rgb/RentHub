import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { Apartment } from '../../interfaces/apartment.interface';
import { Comment } from '../../interfaces/comments.interface';
import { DBService } from '../../services/db.service';
import { UtilityService } from '../../utils/utility.service';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { GetInTouchComponent } from '../get-in-touch/get-in-touch.component';

@Component({
  selector: 'app-apartment-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss'],
})
export class ApartmentDetailsComponent implements OnInit, OnDestroy {
  apartment: Apartment | null = null;
  comments: Comment[] = [];
  commentForm: FormGroup;
  isFavorite: boolean = false;
  amenityIcons: { [key: string]: string } = {
    wifi: 'wifi',
    parking: 'local_parking',
    gym: 'fitness_center',
    pool: 'pool',
    laundry: 'local_laundry_service',
    furnished: 'weekend',
    vegetarian: 'spa',
  };
  isAuthenticated: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private db: DBService,
    public authService: AuthService,
    private utilityService: UtilityService,
    private dialogService: DialogService
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.apartment = this.db.getApartmentById(id) || null;
    this.loadComments();

    this.utilityService.loggedInUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      });
  }

  loadComments(): void {
    if (!this.apartment) return;
    this.comments = this.db
      .getCommentsForApartment(this.apartment.id)
      .map((comments) => {
        const user = this.db.getUserById(comments.userId);
        return {
          ...comments,
          author: user ? user.name : 'Unknown User',
          avatarInitials: user
            ? user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
            : 'U',
        };
      })
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }

  // openInquiryDialog(): void {
  //   this.dialog.open(InquiryDialogComponent, {
  //     width: '400px',
  //     data: { apartment: this.apartment },
  //   });
  // }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    const user = this.authService.getLoggedInUser();
    if (!user) {
      return;
    }

    if (this.isFavorite) {
      this.db.markAsFavorite(user.id, this.apartment?.id || '');
    } else {
      this.db.removeFavorite(user.id, this.apartment?.id || '');
    }
  }

  submitComment(): void {
    if (this.commentForm.valid && this.apartment) {
      const user = this.authService.getLoggedInUser();
      if (!user) return;
      const newComment = {
        id: uuidv4(),
        apartmentId: this.apartment.id.toString(),
        userId: user.id,
        content: this.commentForm.value.content,
        timestamp: new Date(),
      };
      this.db.addComment(newComment);
      this.commentForm.reset();
      this.commentForm.get('content')?.setErrors(null);
      this.commentForm.markAsPristine();
      this.commentForm.markAsUntouched();
      this.commentForm.updateValueAndValidity();
      this.loadComments();
    }
  }

  replyToComment(commentId: string): void {
    // Implement reply functionality
  }

  openGetInTouchDialog(): void {
    if (!this.apartment) return;
    const user = this.authService.getLoggedInUser();
    this.dialogService.open(GetInTouchComponent, {
      apartment: this.apartment,
      user: user,
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
