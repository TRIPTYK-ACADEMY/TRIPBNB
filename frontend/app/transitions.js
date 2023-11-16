export default function(){
  this.transition(
    this.use('toLeft'),
    this.fromRoute('index'),
    this.toRoute('booking'),
    this.reverse('toRight'),
  );
}
