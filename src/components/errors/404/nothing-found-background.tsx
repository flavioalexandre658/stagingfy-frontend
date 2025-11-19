"use client"

import { Illustration } from './illustration';
import classes from './nothing-found-background.module.css';

function renderContent(message: string) {
  switch (message) {
    default:
      return (
        <p
          className={`text-lg text-center ${classes.description}`}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      );
  }
}

export function NothingFoundBackground({ title, message }: { title: string; message: string }) {

  return (
    <div className={`max-w-4xl mx-auto px-4 ${classes.root}`}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          {renderContent(message)}
        </div>
      </div>
    </div>
  );
}