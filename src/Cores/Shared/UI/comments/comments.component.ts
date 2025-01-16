import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComment } from '../../../Interfaces/icomment';
import { CommentService } from './../../../Services/comment.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  // properties
  @Input({ required: true }) postId!: string;
  comments: IComment[] = [];
  loading: boolean = false;
  loadingAddComment:boolean = false;
  // injection
  private readonly _CommentService: CommentService = inject(CommentService)
  private readonly _ToastrService: ToastrService = inject(ToastrService)

  // addCommentForm 
  addCommentForm!: FormGroup;

  ngOnInit(): void {
    this.addCommentForm = new FormGroup({
      content: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      post: new FormControl(this.postId)
    })
  
    this.loading = true;

    this._CommentService.getCommentsForPost(this.postId).subscribe({
      next: (res) => {
        this.comments = res.comments;
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    })
  }

  addComment() {
    this.loadingAddComment = true;
    this._CommentService.createComment(this.addCommentForm.value).subscribe({
      next: (res) => {
        this.loadingAddComment = false;
        this.comments = res.comments;
        this.addCommentForm.get('content')?.reset();
      },
      error: (err) => {
        this.loadingAddComment = false;
        this._ToastrService.error(err.error.error)
      }
    })

  }
}
