export class Task{
    title : string; // name des task
    description : string; // beschreibung
    category: string;  // abteilung
    date: number; // datum wann es erledigt wird
    prio: string;  // welche prio
    progress: string;
    taskowner: string;

    constructor(obj: any){
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.category = obj ? obj.category : '';
        this.date  = obj ? obj.date  : '';
        this.prio  = obj ? obj.prio  : '';
        this.taskowner  = obj ? obj.taskowner  : '';
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            category: this.category,
            date : this.date ,
            prio : this.prio , 
            progress: 'toDo',
            taskowner: this.taskowner,
        }
    }
}