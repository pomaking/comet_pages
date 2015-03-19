Orion Pages
===========

Create new routes with custom templates right in the admin.

## Getting Started

Install the package

```sh
meteor add #comet cms#
```


Example:

```html
<template name="pagesSimple">
	<h1 class="title">{{ title }}</h1>
	<div class="content">
		{{{ content }}}
	</div>
</template>
```
```js
orion.pages.addTemplate({
	template: 'pagesSimple', 
	name: 'Simple',
	description: 'Simple template'
}, {
	content: orion.attribute('froala', {
	  label: 'Content'
	})
})
```

### List Pages

To list pages you have to **subscribe**.

```js
// This
orion.subs.subscribe('pages', arg1, arg2);
// Will return this
orion.pages.collection.find(arg1, arg2);
```

Pages comes with a built in helper for all your template that
returns the pages (you must be subscribed first). 
You can use it like this:

```html
<h3>All Pages</h3>
{{# each pages }}
  <a href="{{ path }}">
    {{ title }}
  </a>
{{/ each }}

<h3>Some Pages</h3>
{{# each pages template="pagesSimple" }}
  <a href="{{ path }}">
    {{ title }}
  </a>
{{/ each }}
```

> When you call path() on a page, it will return the path to the page. Its important to use this, becouse the url might change
