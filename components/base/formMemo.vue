<template>
  <FormKit
    type="textarea"
    name="message"
    inner-class="relative"
    input-class="no-resize"
    maxlength="190"
    help="You can still have help text!"
    :sections-schema="{
      suffix: {
        $el: 'span',
        attrs: {
          class: 'input-char-count'
        },
        children: [
          '$: $attrs.maxlength - $fns.length($value || 0)',
          {
            $el: 'span',
            children: '$: $attrs.maxlength - $fns.length($value || 0) + \' characters remaining\'',
            attrs: {
              class: 'char-count-hover'
            }
          }
        ]
      }
    }"
  />
</template>

<style>
textarea.no-resize {
  resize: none;
}
.input-char-count {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 10px;
  cursor: default;
  padding: 0.15rem;
  line-height: 1;
  background: rgba(255,255,255, 0.5);
}
.char-count-hover {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 50%);
  white-space: nowrap;
  background: rgba(0,0,0,0.65);
  color: #fff;
  padding: 0.25em 0.5em;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
}
.input-char-count:hover .char-count-hover {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}
</style>
