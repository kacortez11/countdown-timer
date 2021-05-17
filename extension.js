const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;

let panelButton, panelButtonText, timeout;
let counter = 0, timer;

function setButtonText() {
  counter++;
  // var time_now = GLib.spawn_command_line_sync("date -d 'now' +%s");
  // var [ok, out, err, exit] = GLib.spawn_command_line_sync("date -d 'now + 9 hours' +%s");
  // var time_difference = out - time_now;
  var remaining = 32400 - counter;
  var hours = Math.floor(remaining / 3600);
  var hours_r = remaining % 3600;
  var minutes = Math.floor(hours_r / 60);
  var seconds = Math.floor(hours_r % 60);
  var out = ""+ hours.toString() + "hrs, " + minutes.toString() + "mins, "+seconds.toString()+"secs before END OF WORK";
  panelButtonText.set_text(out.toString());
  return remaining > 0;
}

function init() {
  panelButton = new St.Bin({
    style_class : "panel-button"
  });
  panelButtonText = new St.Label({
    style_class : "panelButtonTextLabel",
    text : "Starting..."
  });
  panelButton.set_child(panelButtonText);
}

function enable () {
  Main.panel._leftBox.insert_child_at_index(panelButton, 2);
  timeout = Mainloop.timeout_add_seconds(1.0, setButtonText);
}

function disable () {
  Mainloop.source_remove(timeout);
  Main.panel._leftBox.remove_child_at_index(panelButton);

}
