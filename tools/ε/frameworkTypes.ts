import { Component } from ".";

export interface Element<C = any> {
  // id: number;
  container: C;
  attributes: Attributes;
  children: Children;
};

export type Children = Element[] | string | null;

export interface Attributes {
  [name: string]: string | number | ((...args : any[]) => any);
};