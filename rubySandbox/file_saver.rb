class Gotcha < StandardError
  attr_accessor :path,:file_name
end

class NoGotcha < StandardError
end

class FileSaver
  attr_reader :file
  def run(target_file, &block)
    raise "TypeError" unless target_file.is_a?(TargetFile)

    @file = target_file

    state = State.new(@file)
    state.save_name = @file.basename
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
  attr_accessor :to_path,
                :save_name,
                :empty,
                :additional_filename,
                :file
  alias_method :empty?, :empty

  def initialize(file)
    @file = file
    @empty = false
  end

  def assert(bool)
    is bool
  end

  def is(bool)
    raise NoGotcha.new unless bool
  end

  def dir(dir_name, &block)
    child = self.dup
    begin
      child.to_path = File.expand_path(dir_name,@to_path)

      # 子stateで評価する
      child.instance_eval(&block)

      # 子stateが保存対象外なら抜ける
      raise NoGotcha if child.empty?

      # 子Stateで保存先が見つかった
      gotcha = Gotcha.new
      gotcha.path = child.to_path
      gotcha.file_name = child.save_name
      raise gotcha
    rescue NoGotcha
      # 子Stateで保存先が見つからなかった
    end
  end

  def empty_dir()
    @empty = true
  end

end

require 'Pathname'

class TargetFile
  attr_accessor :dirname,
                :full_path,
                :basename,
                :pure_basename,
                :extname
  attr_accessor :atime,
                :ctime,
                :size

  def initialize(full_path,file_stat=nil)
    path_name=Pathname.new(full_path)
    @full_path = full_path
    @dirname = dirname
    @basename = path_name.basename(full_path).to_s
    @pure_basename = path_name.basename(full_path).to_s.split(".")[0]
    @extname = path_name.extname
    if file_stat
      @atime = file_stat.attime
      @ctime = file_stat.ctime
      @size = file_stat.size
    end
  end

  def is_image?()
    ["gif","jpg","jpeg","jpe","jfif","png","bmp","dib","rle","ico","ai","art","psd","tif","tiff","nsk","webp"].include?(@extname)
  end

  def is_sound?()
    ["mp3","wma ","asf","3gp","3g2","aac","ogg","oga","mov","m4a","alac","flac","wav"].include?(@extname)
  end

  def is_movie?()
    ["avi","flv","mpg","mpeg","mp4","mkv","mov","qt","wmv","asf","m2ts","ts","m4a","webm","ogm"].include?(@extname)
  end
end
