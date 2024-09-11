import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  mobileNumber: string;

  @Column()
  @Exclude()
  profession: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  confirmPassword: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profileImg: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true, default: 'user' })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateJoined: Date;

  @Column({ nullable: true })
  fineAmount: number;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable({
    name: 'user_following',
    joinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'following_id',
      referencedColumnName: 'id'
    }
  })
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(firstname: string) {
    this.firstName = firstname;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(lastname: string) {
    this.lastName = lastname;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getMobileNumber(): string {
    return this.mobileNumber;
  }

  setMobileNumber(number: string) {
    this.mobileNumber = number;
  }

  getProfession(): string {
    return this.profession;
  }

  setProfession(profession: string) {
    this.profession = profession;
  }

  getBio(): string {
    return this.bio;
  }

  setBio(bio: string) {
    this.bio = bio;
  }

  getProfileImage(): string {
    return this.profileImg;
  }

  setProfileImage(image: string) {
    this.profileImg = image;
  }

  getNationality(): string {
    return this.nationality;
  }

  setNationality(nationality: string) {
    this.nationality = nationality;
  }

  getRole(): string {
    return this.role;
  }

  setRole(role: string) {
    this.role = role;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
    }

  getFineAmount(): number {
    return this.fineAmount;
  }

  setFineAmount(amount: number) {
    this.fineAmount = amount;
  }

  getDateJoined(): Date {
    return this.dateJoined;
  }

  setDateJoined(dateJoined: Date) {
    this.dateJoined = dateJoined;
  }

  getBooks() {
    return this.books;
  }

  setBooks(books: Book[]) {
    this.books = books;
  }

  
}
