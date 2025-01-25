# Documentation

## Library

The abstract class Library does not contain a createLibrary method because resolving the right subclass to create based on the value of type will require the abstract class to be aware of its subclasses and that's not a good practice

```
static createLibrary(type: string, ...args: any[]): Library {
  if (type === "history") {
    return new HistoryLibrary(...args);
  } else if (type === "biology") {
    return new BiologyLibrary(...args);
  } else if (type === "science") {
    return new ScienceLibrary(...args);
  }
}
```