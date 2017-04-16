using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace WpfApp1
{
    class Bind : INotifyPropertyChanged

    {
        private string _Item1;
        public string Item1 {
            get {
                return _Item1;
            }
            set {
                _Item1 = value;
                OnPropertyChanged("Item1");
            }
        }
        private ICommand _Command1;
        public ICommand Command1
        {
            get { return _Command1 = _Command1 ?? new Command1(this); }
        }

        private ICommand _Command2;

        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void OnPropertyChanged(string name)
        {
            if (PropertyChanged == null) return;

            PropertyChanged(this, new PropertyChangedEventArgs(name));
        }

        public ICommand Command2
        {
            get { return _Command2 = _Command2 ?? new Command2(this); }
        }
    }


    class Command1 : CommandBase
    {
        private Bind b;
        public Command1(Bind b) {
            this.b = b;
        }
        public override void Execute(object parameter) {
            MessageBox.Show(b.Item1);
        }
    }

    class Command2 : CommandBase
    {
        private Bind b;
        public Command2(Bind b)
        {
            this.b = b;
        }
        public override void Execute(object parameter)
        {
            b.Item1="Hello";
        }
    }



    public class CommandBase : ICommand
    {
        public virtual  bool CanExecute(object parameter)
        {
            return true;
        }
        public event EventHandler CanExecuteChanged;

        public virtual void Execute(object parameter)
        {
           
        }
    }
}
