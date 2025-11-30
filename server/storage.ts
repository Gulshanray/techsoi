import { type User, type InsertUser, type Review, type InsertReview, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private reviews: Map<string, Review>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.reviews = new Map();
    this.contacts = new Map();
    
    // Add some initial reviews
    this.seedReviews();
  }

  private seedReviews() {
    const initialReviews: Review[] = [
    
    ];

    initialReviews.forEach(review => {
      this.reviews.set(review.id, review);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      phone: insertContact.phone || null,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
