<script setup lang="ts">
const { element } = useDocSearch()

const onClick = () => element.value.querySelector('button').click()
</script>

<template>
  <div class="doc-search" @click="onClick">
    <button type="button" aria-label="Search">
      <span class="content">
        <div>
          <Icon name="heroicons-outline:search" />
          <span>Search</span>
        </div>
        <span>
          <kbd>
            <svg width="18px" height="18px" class="DocSearch-Control-Key-Icon">
              <path
                d="M5.4061 5.3952H7.8061M6.6061 6.5952V12.5952M9.8593 5.3952L9.9253 12.5868M12.0001 9C12.3997 9.3996 12.6001 9.8004 12.6001 10.2V12.6M14.7913 5.4V12.5952M10.0609 5.3952C12.0697 5.3952 12.6001 5.3952 12.6001 7.1952C12.6001 8.9952 12.0697 8.9952 10.0609 8.9952M3.8461 11.1636C3.7381 11.7012 3.5137 12.6156 2.3569 12.6072C1.2001 12.6 0.600098 11.4156 0.600098 9.6V8.4C0.600098 6.516 1.2001 5.4 2.3569 5.4072C3.5137 5.4144 3.7177 6.1248 3.8449 7.0176M15.0637 12.6H17.4073"
                stroke-width="1.2" stroke="currentColor" fill="none" stroke-linecap="square" />
            </svg>
          </kbd>
          <kbd>K</kbd>
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped lang="ts">
css({
  '.doc-search': {
    '&:hover': {
      button: {
        borderColor: '{color.gray.300}'
      }
    },
    button: {
      padding: '{space.2} {space.4}',
      '.content': {
        borderRadius: '{radii.md}',
        display: 'flex',
        alignItems: 'center',
        color: '{color.gray.500}',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '{color.gray.500}',
        fontSize: '{fontSize.xs}',
        gap: '{space.8}',
        padding: '{space.rem.375}',
        div: {
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          gap: '{space.2}',
          span: {
            display: 'block',
            fontSize: '{fontSize.xs}',
            fontWeight: '{fontWeight.medium}',
          }
        },
        '@dark': {
          color: '{color.gray.400}',
          borderColor: '{color.gray.700}',
        },
        '&:hover': {
          color: '{color.gray.700}',
          borderColor: '{color.gray.700}',
          '@dark': {
            color: '{color.gray.200}',
            borderColor: '{color.gray.500}',
          }
        },
        span: {
          '&:nth-child(2)': {
            flex: 'none',
            display: 'none',
            fontSize: '{fontSize.xs}',
            fontWeight: '{fontWeight.semibold}',
            '@sm': {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '{space.1}'
            }
          },
          kbd: {
            color: '{color.gray.600}',
            padding: '{space.1} {space.2}',
            boxShadow: 'inset 0 -2px 0 0 #282d55,inset 0 0 1px 1px #51577d,0 2px 2px 0 rgba(3,4,9,.3)',
            '@dark': {
              color: '{color.white}'
            }
          }
        }
      }
    },

  }
})
</style>