export default (value, character_limit, replacement) => {
  if (!value) {
    return ''
  }

  let truncated_value = value.substring(0, character_limit)

  if (replacement && truncated_value.length < value.length) {
    truncated_value = truncated_value.substring(0, truncated_value.length - replacement.length) + replacement
  }

  return truncated_value
}
