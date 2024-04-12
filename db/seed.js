const db = require("./db");
const Activity = require("./Activity");
const Routine = require("./Routine");
const Routine_Activity = require("./Routine_Activity");

const init = async () => {
  try {
    await db.connect();
    await db.reset();

    const activities = {};
    for (const activity of [
      {name: "Jumping Jacks", description: "Jump up and down, with your arms and legs spreading out from down by your side each time."},
      {name: "Squats", description: "Sit on a pretend chair, then stand back up again."},
      {name: "Push Ups", description: "Lay down on the ground and push away from the earth until gravity brings you back down."},
    ]) { activities[activity.name] = await new Activity(activity).add(); }

    const routines = {};
    for (const routine of [
      {name: "Cardio", goal: "Strengthen your heart.", isPublic:true},
      {name: "Leg Day", goal: "Strengthen your legs.", isPublic:true},
      {name: "Arm Day", goal: "Strengthen your arms.", isPublic:true},
      {name: "Core Day", goal: "Strengthen your core.", isPublic:true},
    ]) { routines[routine.name] = await new Routine(routine).add(); }

    for (const ra of [
      {routineId: routines["Cardio"]?.id, activityId: activities["Jumping Jacks"]?.id, count: 50},
      {routineId: routines["Leg Day"]?.id, activityId: activities["Squats"]?.id, count: 15},
      {routineId: routines["Arm Day"]?.id, activityId: activities["Push Ups"]?.id, count: 20},
    ]) { await new Routine_Activity(ra).add(); }

    await db.end();
  }
  catch (error) {
    console.log(error);
  }
}

init();
