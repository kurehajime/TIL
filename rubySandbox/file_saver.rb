class Gotcha < StandardError
  attr_accessor :path,:file_name
end

class NoGotcha < StandardError
end

class FileSaver
  def run(&block)
    state = State.new
    begin
      state.instance_eval(&block)
    rescue Gotcha=> e
      save(e)
    rescue NoGotcha
      no_save
    end
  end

  def save(gotcha)
    p gotcha.path
    p gotcha.file_name
  end

  def no_save()
    p "No Save"
  end
end

class State
  attr_accessor :from_path,
                :to_path,
                :file_name


  def assert(bool)
    is bool
  end

  def is(bool)
    raise NoGotcha.new unless bool
  end

  def to(dir_name,&block)
    child = self.dup
    begin
      child.to_path = File.expand_path(dir_name,@to_path)
      child.instance_eval(&block)

      # 子Stateで保存先が見つかった
      gotcha = Gotcha.new
      gotcha.path = child.to_path
      gotcha.file_name = child.file_name
      raise gotcha
    rescue NoGotcha
      # 子Stateで保存先が見つからなかった
    end
  end

end