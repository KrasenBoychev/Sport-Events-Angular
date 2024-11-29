import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription, tap } from "rxjs";
import { UserForAuth } from "../types/user";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class UserService implements OnDestroy {
    private user$$ = new BehaviorSubject<UserForAuth | null>(null);
    private user$ = this.user$$.asObservable();

    USER_KEY = '[user]';
    user: UserForAuth | null = null;
    userSubscription: Subscription | null = null;

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor(private http: HttpClient) {
        this.userSubscription = this.user$.subscribe((user) => {
            this.user = user;
        });
    }

    login(email: string, password: string) {
        return this.http
            .post<UserForAuth>('/api/login', { email, password })
            .pipe(tap((user) => this.user$$.next(user)));
    }

    register(
        email: string,
        password: string,
        rePassword: string
    ) {
        return this.http
            .post<UserForAuth>('/api/register', {
                email, 
                password,
                rePassword,
            })
            .pipe(tap((user) => this.user$$.next(user)));
    }

    logout() {
        return this.http
            .post('/api/logout', {})
            .pipe(tap((user) => this.user$$.next(null)));
    }

    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe();
    }
}