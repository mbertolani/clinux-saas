export function formatDateTime(payload: string) {
  return payload?.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$3/$2/$1 $4:$5')
}
export function formatTime(payload: string) {
  if (payload.length === 8)
    return payload?.replace(/(\d{2}):(\d{2}):(\d{2})/, '$1:$2')
  else
    return payload?.replace(/(\d{2}):(\d{2}):(\d{2}).(\d{6})/, '$1:$2')
}
export function formatDate(payload: string) {
  return payload?.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')
}
export function formatCNPJ(payload: string) {
  return payload?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}
export function formatFone(payload: string) {
  return payload?.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}
export function formatCel(payload: string) {
  return payload?.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
}
export function formatCpf(payload: string) {
  return payload?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
