import { Component } from ".";

export interface Element<C = any> {
  _id?: string;
  _forceRender?: boolean;
  container: C;
  attributes: Attributes;
  children: Children;
};

export type Children = FnToElement[] | string | null;

export type FnToElement = (_id?: string) => Element;

export interface Attributes {
  [name: string]: string | number | ((...args : any[]) => any);
};